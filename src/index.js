const {
  renderNewsletter,
  saveNewsletter,
  getCurrentMonth
} = require('./utils')

;(async () => {
  const data = {}
  data.currentMonth = getCurrentMonth()
  const newsletter = await renderNewsletter({ data })
  saveNewsletter(newsletter)
})()
