const { chunkArray } = require('@ulisesgascon/array-to-chunks')
const got = require('got')
const { npmStat } = require('../config')
const debug = require('debug')('newsletter:download-npm-stats-report')

const collectNpmStatReport = async ({ today }) => {
  debug(`Total packages to check against the score API: ${npmStat.packages.length}`)

  const chunks = chunkArray(npmStat.packages, npmStat.parallelRequests)
  debug(`Total chunks: ${chunks.length}`)
  let totalDownloads = 0
  const packagesData = {}
  for (let index = 0; index < chunks.length; index++) {
    const chunk = chunks[index]
    debug(`Processing chunk ${index + 1}/${chunks.length}`)
    debug(`Current Packages: ${chunk}`)
    const responses = await Promise.all(chunk.map(pkg => got(`https://npm-stat.com/api/download-counts?package=${pkg}&from=2000-04-20&until=${today}`).json()))

    responses.forEach(response => {
      const key = Object.keys(response)[0]
      const total = Object.keys(response[key]).reduce((acc, curr) => acc + response[key][curr], 0)
      packagesData[key] = { total }
      totalDownloads += total
    })
  }

  debug(`Total downloads: ${totalDownloads}`)
  debug('Calculating Top10...')

  const top10 = Object.keys(packagesData)
    .sort((a, b) => packagesData[b].total - packagesData[a].total)
    .slice(0, 10)
    .map(a => ({ name: a, total: packagesData[a].total }))

  return {
    totalDownloads,
    top10
  }
}

module.exports = {
  collectNpmStatReport
}
