module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb'
}
