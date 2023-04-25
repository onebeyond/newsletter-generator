const stepSecurityGsRepos = require('./data/stepsecurity-gs-repos.json')
const stepSecurityObRepos = require('./data/stepsecurity-ob-repos.json')

module.exports = {

    stepSecurity: {
        repositories: {
            payloads: {
                gs: stepSecurityGsRepos,
                ob: stepSecurityObRepos
            },
            output: {
                top10: [
                    {
                      "org": "onebeyond",
                      "repo": "systemic-knex",
                      "score": 6.9,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "onebeyond-studio-core",
                      "score": 6.8,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "onebeyond-studio-email-providers",
                      "score": 6.8,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "swagger-endpoint-validator",
                      "score": 6.8,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "onebeyond-studio-obelisk",
                      "score": 6.5,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "cuckoojs",
                      "score": 6.3,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "open-source-project-template",
                      "score": 6.3,
                    },
                    {
                      "org": "onebeyond",
                      "repo": ".github",
                      "score": 6.2,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "12-factor-app-pills",
                      "score": 6.2,
                    },
                    {
                      "org": "onebeyond",
                      "repo": "systemic-pg",
                      "score": 6.2,
                    },
                ],
                average: 4.338194444444441
            }

        }
    }
}