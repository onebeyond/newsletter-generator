const cauldronActivity = require('./data/cauldron-activity.json')
const cauldronCommunity = require('./data/cauldron-community.json')
const cauldronOverview = require('./data/cauldron-overview.json')
const cauldronPerformance = require('./data/cauldron-performance.json')
const stepSecurityGsRepos = require('./data/stepsecurity-gs-repos.json')
const stepSecurityObRepos = require('./data/stepsecurity-ob-repos.json')
const githubOutputData = require('./data/output-github.json')

module.exports = {
  github: {
    output: githubOutputData
  },
  npmStat: {
    output: {
      totalDownloads: 5908504,
      top10: [
        { name: 'rascal', total: 2181445 },
        { name: 'stashback', total: 1955026 },
        { name: '@guidesmiths/generator-react-component', total: 437497 },
        { name: 'react-native-uservoice', total: 314876 },
        { name: 'marv', total: 307220 },
        { name: 'marv-pg-driver', total: 231643 },
        { name: 'make-manifest', total: 145833 },
        { name: '@onebeyond/license-checker', total: 114225 },
        { name: 'whoosh', total: 111288 },
        { name: 'systemic', total: 109381 }
      ]
    }
  },
  cauldron: {
    payloads: {
      summary: cauldronOverview,
      activity: cauldronActivity,
      community: cauldronCommunity,
      performance: cauldronPerformance
    },
    output: {
      summary: {
        commits_overview: 3703,
        issues_overview: 442,
        reviews_overview: 984,
        questions_overview: 0,
        commits_last_year_overview: 946,
        issues_last_year_overview: 155,
        reviews_last_year_overview: 390,
        questions_last_year_overview: 0,
        commits_yoy_overview: 84.05,
        issues_yoy_overview: 106.67,
        reviews_yoy_overview: 61.16,
        questions_yoy_overview: 0,
        commit_authors_overview: 158,
        issue_submitters_overview: 129,
        review_submitters_overview: 93,
        question_authors_overview: 0,
        commit_authors_last_year_overview: 56,
        issue_submitters_last_year_overview: 26,
        review_submitters_last_year_overview: 34,
        question_authors_last_year_overview: 0,
        commit_authors_yoy_overview: 19.15,
        issue_submitters_yoy_overview: -36.59,
        review_submitters_yoy_overview: 17.24,
        question_authors_yoy_overview: 0,
        issues_median_time_to_close_overview: 6.47,
        reviews_median_time_to_close_overview: 0.85,
        issues_median_time_to_close_last_year_overview: 13.43,
        reviews_median_time_to_close_last_year_overview: 0.63,
        issues_median_time_to_close_yoy_overview: 126.09,
        reviews_median_time_to_close_yoy_overview: -89.95
      },
      activity: {
        commits_activity_overview: 407,
        lines_commit_activity_overview: '1132.84',
        lines_commit_file_activity_overview: '0.22',
        issues_created_activity_overview: 69,
        issues_closed_activity_overview: 41,
        issues_open_activity_overview: 134,
        reviews_created_activity_overview: 185,
        reviews_closed_activity_overview: 154,
        reviews_open_activity_overview: 190
      },
      community: {
        active_people_git_community_overview: 29,
        active_people_issues_community_overview: 10,
        active_people_patches_community_overview: 20,
        onboardings_git_community_overview: 15,
        onboardings_issues_community_overview: 5,
        onboardings_patches_community_overview: 10
      },
      performance: {
        issues_time_open_average_performance_overview: 442.48,
        issues_time_open_median_performance_overview: 165.69,
        open_issues_performance_overview: 135,
        reviews_time_open_average_performance_overview: 419.86,
        reviews_time_open_median_performance_overview: 382.67,
        open_reviews_performance_overview: 202
      }
    }
  },
  stepSecurity: {
    repositories: {
      payloads: {
        gs: stepSecurityGsRepos,
        ob: stepSecurityObRepos
      },
      output: {
        top10: [
          {
            org: 'onebeyond',
            repo: 'systemic-knex',
            score: 6.9
          },
          {
            org: 'onebeyond',
            repo: 'onebeyond-studio-core',
            score: 6.8
          },
          {
            org: 'onebeyond',
            repo: 'onebeyond-studio-email-providers',
            score: 6.8
          },
          {
            org: 'onebeyond',
            repo: 'swagger-endpoint-validator',
            score: 6.8
          },
          {
            org: 'onebeyond',
            repo: 'onebeyond-studio-obelisk',
            score: 6.5
          },
          {
            org: 'onebeyond',
            repo: 'cuckoojs',
            score: 6.3
          },
          {
            org: 'onebeyond',
            repo: 'open-source-project-template',
            score: 6.3
          },
          {
            org: 'onebeyond',
            repo: '.github',
            score: 6.2
          },
          {
            org: 'onebeyond',
            repo: '12-factor-app-pills',
            score: 6.2
          },
          {
            org: 'onebeyond',
            repo: 'systemic-pg',
            score: 6.2
          }
        ],
        average: 4.338194444444441
      }

    }
  }
}
