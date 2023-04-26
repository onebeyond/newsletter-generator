const nock = require('nock')
const { collectCauldronReports } = require('../../src/workflows/download-cauldron-report')
const { cauldron: fixtures } = require('../../__fixtures__')
const { getDatesRanges } = require('../../src/utils')

describe('download-cauldron-report', () => {
  beforeEach(nock.cleanAll)

  it('should download Cauldron reports', async () => {
    const { start, end } = getDatesRanges(90)
    const {
      summary: summaryData,
      activity: activityData,
      community: communityData,
      performance: performanceData
    } = fixtures.payloads

    const scope = nock('https://cauldron.io')
      .get(`/project/7192/metrics?from=${start}&to=${end}&tab=overview`)
      .reply(200, summaryData)
      .get(`/project/7192/metrics?from=${start}&to=${end}&tab=activity-overview`)
      .reply(200, activityData)
      .get(`/project/7192/metrics?from=${start}&to=${end}&tab=community-overview`)
      .reply(200, communityData)
      .get(`/project/7192/metrics?from=${start}&to=${end}&tab=performance-overview`)
      .reply(200, performanceData)

    const data = await collectCauldronReports({ start, end })

    expect(data).toStrictEqual(fixtures.output)

    // Nocks had been called
    expect(scope.isDone()).toEqual(true)
  })
})
