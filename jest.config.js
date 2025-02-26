
process.env.NODE_ENV = "test";
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 70000,
    testMatch: ['**/tests/**/*.test.ts'], // Only test files inside `tests/` folder
  }