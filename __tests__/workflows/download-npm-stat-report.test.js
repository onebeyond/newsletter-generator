const nock = require('nock')
const { collectNpmStatReport } = require('../../src/workflows/download-npm-stat-report')
const config = require('../../src/config')
const { npmStat: fixtures } = require('../../__fixtures__')
const { getDatesRanges } = require('../../src/utils')

describe('download-cauldron-report', () => {
  beforeEach(nock.cleanAll)

  it('should download Cauldron reports', async () => {
    const { end } = getDatesRanges(90)

    const scopes = []

    config.npmStat.packages.forEach((pkg) => {
      const pkgTop10 = fixtures.output.top10.filter(item => item.name === pkg)
      const payload = {}
      payload[pkg] = {}
      payload[pkg][end] = pkgTop10.length ? pkgTop10[0].total : 1

      scopes.push(
        nock('https://npm-stat.com')
          .get(`/api/download-counts?package=${pkg}&from=2000-04-20&until=${end}`)
          .reply(200, payload)
      )
    })

    const data = await collectNpmStatReport({ today: end })
    expect(data).toStrictEqual(fixtures.output)

    // Nocks had been called
    expect(scopes.every(scope => scope.isDone())).toEqual(true)
  })
})
