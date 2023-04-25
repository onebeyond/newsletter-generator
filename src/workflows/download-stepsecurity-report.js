const { stepSecurity } = require('../config')
const got = require('got')
const debug = require('debug')('newsletter:download-stepsecurity-report')

const collectStepSecurityReports = async () => {
  debug('Downloading StepSecurity reports...')

  const { gs: gsUrl, ob: obUrl } = stepSecurity.repositories

  const [obRepositories, gsRepositories] = await Promise.all([
    got(obUrl).json(),
    got(gsUrl).json()
  ])

  debug('StepSecurity reports downloaded')
  debug('Total GS Repositories:', gsRepositories.length)
  debug('Total OB Repositories:', obRepositories.length)
  debug('Generating reports...')

  const repositories = [...gsRepositories.filter(a => a.latest_scorecard_score), ...obRepositories.filter(a => a.latest_scorecard_score)].sort((a, b) => b.latest_scorecard_score.score - a.latest_scorecard_score.score)
  debug('Total Repositories with scorecard:', repositories.length)

  const top10 = repositories.slice(0, 10).map(a => ({
    repo: a.repository_name,
    org: a.github_account_name,
    score: a.latest_scorecard_score.score
  }))
  const average = repositories.reduce((total, next) => total + next.latest_scorecard_score.score, 0) / repositories.length

  return { top10, average }
}

module.exports = { collectStepSecurityReports }
