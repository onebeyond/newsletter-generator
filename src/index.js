const {
  renderNewsletter,
  saveNewsletter,
  getCurrentMonth
} = require('./utils')
const debug = require('debug')('newsletter:main')

const config = require('./config')
const { collectStepSecurityReports } = require('./workflows/download-stepsecurity-report')

;(async () => {
  const data = {}
  data.currentMonth = getCurrentMonth()
  debug('Starting the StepSecurity process...')
  data.stepSecurity = await collectStepSecurityReports()
  debug('Rendering the newsletter...')
  const newsletter = await renderNewsletter({ data, config })
  debug('Storing the newsletter...')
  saveNewsletter(newsletter)
})()
