const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname, "."),
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test-result/",
        outputName: "test-results.xml",
      },
    ],
  ],
  setupFiles: ["<rootDir>/test.setup.config.js"],
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
      },
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  testMatch: ["<rootDir>/**/*.test.{ts,tsx}"],
  moduleNameMapper: {
    "\\.scss$": "<rootDir>/__mocks__/css.mock.js",
  },
};
