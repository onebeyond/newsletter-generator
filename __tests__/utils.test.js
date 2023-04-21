
const { renderNewsletter, getCurrentMonth, getTimeStamp } = require('../src/utils')

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('Utils', () => {
  describe('getCurrentMonth', () => {
    it('should return January', () => {
      expect(getCurrentMonth()).toBe('January')
    })
  })

  describe('getTimeStamp', () => {
    it('should return a valid timestamp', () => {
      expect(getTimeStamp()).toBe(1577836800)
    })
  })

  describe('renderNewsletter', () => {
    it('should render a newsletter', async () => {
      const data = { currentMonth: 'January' }
      const newsletter = await renderNewsletter({ data })
      expect(newsletter).toMatchSnapshot()
    })
  })
})
