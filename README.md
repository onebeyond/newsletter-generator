# newsletter-generator

## About 

This repository will help you to generate the data and the template needed to the One Beyond Open Source Newsletter.


## Awesome features

- Great testing (in progress) 🍿
- Github data collection 📊
- StepSecurity data collection 🔐
- Cauldron data collection 🍲
- Npm stat data collection 📦
- Great template with EJS ⭐️


## Usage

### Installation

```
nvm use
npm i
```

### Usage

You will need to create a `.env` file with the following content:

```
GITHUB_TOKEN=thisismytoken
```

In order to generate the token please [follow this guideslines](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), only read access to public repositories is needed.


### Manual Steps

Ensure [Cauldron project](https://cauldron.io/project/7192) is updated with the last changes in the org before running the script.


### Run the script

```
DEBUG=newsletter* npm run start
```

The generated report will be located at `/output` folder.
