// Load secrets
require('dotenv').config()

const {
  renderNewsletter,
  saveNewsletter,
  getCurrentMonth,
  getDatesRanges
} = require('./utils')
const debug = require('debug')('newsletter:main')

const config = require('./config')
const { collectStepSecurityReports } = require('./workflows/download-stepsecurity-report')
const { collectCauldronReports } = require('./workflows/download-cauldron-report')
const { collectNpmStatReport } = require('./workflows/download-npm-stat-report')

;(async () => {
  const data = {}
  data.currentMonth = getCurrentMonth()
  const { start: start90daysAgo, end } = getDatesRanges(90)
  debug('Starting the NPM Stats process...')
  data.npmStat = await collectNpmStatReport({ today: end })
  debug('Starting the Cauldron process...')
  data.cauldron = await collectCauldronReports({ start, end })
  debug('Starting the StepSecurity process...')
  data.stepSecurity = await collectStepSecurityReports()
  debug('Rendering the newsletter...')
  const newsletter = await renderNewsletter({ data, config })
  debug('Storing the newsletter...')
  saveNewsletter(newsletter)
})()
