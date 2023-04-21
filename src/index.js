const {
  renderNewsletter,
  saveNewsletter,
  getCurrentMonth
} = require('./utils')

;(async () => {
  const data = {}
  data.currentMonth = getCurrentMonth()
  const newsletter = await renderNewsletter({ data })
  console.log('Newsletter', newsletter)
  saveNewsletter(newsletter)
})()
