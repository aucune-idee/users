module.exports = {
    "roots": [
      "<rootDir>/test"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "moduleNameMapper": {
      "secret.json": "<rootDir>/__mocks__/secret.json"
    }
  }