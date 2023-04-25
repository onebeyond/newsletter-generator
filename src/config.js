module.exports = {
  cauldron: {
    reference: {
      grafana: 'https://cauldron.io/project/7192/public-kibana'
    },
    baseProjectUrl: 'https://cauldron.io/project/7192'
  },
  stepSecurity: {
    reference: {
      gs: 'https://app.stepsecurity.io/github/app/onebeyond/guidesmiths/repositories',
      ob: 'https://app.stepsecurity.io/github/app/onebeyond/onebeyond/repositories'
    },
    repositories: {
      gs: 'https://agent.api.stepsecurity.io/v1/app/customers/onebeyond/githubaccounts/guidesmiths/repositories',
      ob: 'https://agent.api.stepsecurity.io/v1/app/customers/onebeyond/githubaccounts/onebeyond/repositories'
    }
  }
}
