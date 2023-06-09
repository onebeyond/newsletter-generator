// Load secrets from .env file
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
const { collectGithubReport } = require('./workflows/download-github-reports')

;(async () => {
  const data = {}
  data.currentMonth = getCurrentMonth()
  const { start: start90daysAgo, end } = getDatesRanges(90)
  const { start: start30daysAgo } = getDatesRanges(30)
  debug('Starting the Github process...')
  data.github = await collectGithubReport({ start: start30daysAgo, end })
  debug('Starting the NPM Stats process...')
  data.npmStat = await collectNpmStatReport({ today: end })
  debug('Starting the Cauldron process...')
  data.cauldron = await collectCauldronReports({ start: start90daysAgo, end })
  debug('Starting the StepSecurity process...')
  data.stepSecurity = await collectStepSecurityReports()
  debug('Rendering the newsletter...')
  const newsletter = await renderNewsletter({ data, config })
  debug('Storing the newsletter...')
  saveNewsletter(newsletter)
})()
