const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/vue/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/vue/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/vue/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/vue/test/unit/coverage',
  collectCoverageFrom: [
    'vue/src/**/*.{js,vue}',
    '!vue/src/main.js',
    '!vue/src/router/index.js',
    '!**/node_modules/**'
  ]
}
