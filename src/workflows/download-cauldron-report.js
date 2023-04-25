const { cauldron } = require('../config')
const got = require('got')
const { simplifyObject } = require('@ulisesgascon/simplify-object')
const debug = require('debug')('newsletter:download-cauldron-reports')

const collectCauldronReports = async ({ start, end }) => {
  debug('Downloading Cauldron reports...')
  const { baseProjectUrl } = cauldron

  const [summary, activity, community, performance] = await Promise.all([
    got(`${baseProjectUrl}/metrics?from=${start}&to=${end}&tab=overview`).json(),
    got(`${baseProjectUrl}/metrics?from=${start}&to=${end}&tab=activity-overview`).json(),
    got(`${baseProjectUrl}/metrics?from=${start}&to=${end}&tab=community-overview`).json(),
    got(`${baseProjectUrl}/metrics?from=${start}&to=${end}&tab=performance-overview`).json()
  ])

  debug('StepSecurity reports downloaded')
  debug('Extracting relevant data...')
  const relevantSummary = simplifyObject(summary, {
    exclude: ['issues_still_open_overview_bokeh', 'questions_answers_stackexchange_bokeh', 'issues_closed_ttc_overview_bokeh', 'reviews_open_closed_bokeh_overview', 'issues_open_closed_bokeh_overview', 'author_evolution_bokeh', 'commits_bokeh_overview']
  })
  const relevantActivity = simplifyObject(activity, {
    exclude: ['commits_activity_overview_bokeh', 'issues_open_closed_activity_overview_bokeh', 'reviews_open_closed_activity_overview_bokeh']
  })
  const relevantCommunity = simplifyObject(community, {
    exclude: ['commits_authors_active_community_overview_bokeh', 'issues_authors_active_community_overview_bokeh', 'reviews_authors_active_community_overview_bokeh']
  })
  const relevantPerformance = simplifyObject(performance, {
    exclude: ['issues_created_ttc_performance_overview_bokeh', 'issues_closed_ttc_performance_overview_bokeh', 'reviews_created_ttc_performance_overview_bokeh', 'reviews_closed_ttc_performance_overview_bokeh']
  })

  return {
    summary: relevantSummary,
    activity: relevantActivity,
    community: relevantCommunity,
    performance: relevantPerformance
  }
}

module.exports = {
  collectCauldronReports
}
