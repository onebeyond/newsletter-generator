const nock = require('nock')

const { collectStepSecurityReports } = require('../../src/workflows/download-stepsecurity-report')
const { stepSecurity: fixtures } = require('../../__fixtures__')

describe('download-stepsecurity-report', () => {
  beforeEach(nock.cleanAll)

  it('should download StepSecurity reports', async () => {
    const { gs: gsData, ob: obData } = fixtures.repositories.payloads

    const scope = nock('https://agent.api.stepsecurity.io')
      .get('/v1/app/customers/onebeyond/githubaccounts/guidesmiths/repositories')
      .reply(200, gsData)
      .get('/v1/app/customers/onebeyond/githubaccounts/onebeyond/repositories')
      .reply(200, obData)

    const { top10, average } = await collectStepSecurityReports()

    expect(top10).toStrictEqual(fixtures.repositories.output.top10)
    expect(average).toEqual(fixtures.repositories.output.average)

    // Nocks had been called
    expect(scope.isDone()).toEqual(true)
  })
})
