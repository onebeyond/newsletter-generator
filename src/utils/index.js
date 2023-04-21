const ejs = require('ejs')
const { join } = require('path')
const debug = require('debug')('newsletter:utils')
const { existsSync, mkdirSync, writeFileSync } = require('fs')

const templateFullPath = join(process.cwd(), 'src/templates/newsletter.ejs')

const getCurrentMonth = () => {
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'long' })
  return month
}

const ensureFolderExists = (path) => {
  const directory = path.split('/').slice(0, -1).join('/')
  const directoryPath = join(process.cwd(), directory)
  debug(`Checking if directory exists: ${directoryPath}`)
  if (!existsSync(directoryPath)) {
    debug('Making directory: ', directoryPath)
    mkdirSync(directoryPath, { recursive: true })
  }
}

const getTimeStamp = () => Math.floor(Date.now() / 1000)

const saveNewsletter = (newsletter) => {
  const timestamp = getTimeStamp()
  ensureFolderExists('output/')
  const filePath = join(process.cwd(), 'output', `newsletter_${timestamp}.md`)
  debug(`Saving newsletter to: ${filePath}`)
  writeFileSync(filePath, newsletter)
}

const renderNewsletter = (data) => ejs.renderFile(templateFullPath, data)

module.exports = {
  getCurrentMonth,
  getTimeStamp,
  saveNewsletter,
  renderNewsletter
}
