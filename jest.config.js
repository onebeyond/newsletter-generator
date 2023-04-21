const { defaults } = require('jest-config')

process.env.TZ = 'UTC'

module.exports = {
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, 'src/'],
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js', '!src/index.js']
}
