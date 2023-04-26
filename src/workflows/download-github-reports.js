const ghGot = require('gh-got')

const collectGithubReport = async ({ start, end }) => {
  // Collect all the repos from all the organizations
  const countLimit = 10

  const gsRepos = await ghGot.paginate.all(
    'users/guidesmiths/repos',
    {
      token: process.env.GITHUB_TOKEN,
      pagination: { countLimit }
    }
  )

  const obRepos = await ghGot.paginate.all(
    'users/onebeyond/repos',
    {
      token: process.env.GITHUB_TOKEN,
      pagination: { countLimit }
    }
  )

  const repos = [...gsRepos, ...obRepos]

  // Classify repos by new and active
  const activeRepos = []
  const newRepos = []

  repos.forEach(repo => {
    const rangeStart = new Date(start)
    const rangeEnd = new Date(end)
    const createdAt = new Date(repo.created_at)
    const pushedAt = new Date(repo.pushed_at)

    if (createdAt >= rangeStart) {
      newRepos.push(repo)
    }

    if (pushedAt >= rangeStart && pushedAt <= rangeEnd) {
      activeRepos.push(repo)
    }
  })

  // Collect New Releases
  const releases = await Promise.all(activeRepos.map(async repo => {
    const repoReleases = await ghGot(
            `repos/${repo.full_name}/releases`,
            {
              token: process.env.GITHUB_TOKEN
            }
    ).json()
    return repoReleases.map(rel => ({ ...rel, repo: repo.full_name }))
  }))

  // Filter releases in the date range
  const newReleases = releases.flat()
    .filter(release => {
      if (!release) return false

      const published = new Date(release.published_at)
      const rangeStart = new Date(start)
      const rangeEnd = new Date(end)
      return published >= rangeStart && published <= rangeEnd
    })

  // Filter Top 10
  const top10 = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)

  return { top10, newReleases, newRepos }
}

module.exports = {
  collectGithubReport
}
