
const { renderNewsletter, getCurrentMonth, getTimeStamp, getDatesRanges } = require('../src/utils')
const fixtures = require('../__fixtures__')
const config = require('../src/config')
jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('Utils', () => {
  describe('getCurrentMonth', () => {
    it('should return January', () => {
      expect(getCurrentMonth()).toBe('January')
    })
  })
  describe('getDatesRanges', () => {
    it('should return a valid range for 90 days', () => {
      const { start, end } = getDatesRanges(90)
      expect(end).toBe('2020-01-01')
      expect(start).toBe('2019-10-03')
    })
    it('should return a valid range for 30 days', () => {
      const { start, end } = getDatesRanges(30)
      expect(end).toBe('2020-01-01')
      expect(start).toBe('2019-12-02')
    })
  })

  describe('getTimeStamp', () => {
    it('should return a valid timestamp', () => {
      expect(getTimeStamp()).toBe(1577836800)
    })
  })

  describe('renderNewsletter', () => {
    it('should render a newsletter', async () => {
      const data = {
        currentMonth: 'January',
        stepSecurity: {
          top10: fixtures.stepSecurity.repositories.output.top10,
          average: fixtures.stepSecurity.repositories.output.average
        },
        cauldron: fixtures.cauldron.output,
        npmStat: fixtures.npmStat.output,
        github: fixtures.github.output
      }
      const newsletter = await renderNewsletter({ data, config })
      expect(newsletter).toMatchSnapshot()
    })
  })
})
