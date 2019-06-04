module.exports = {
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "/app/.*\\.(test|spec).(ts|tsx|js)$",
    "roots": [
      "<rootDir>/app"
    ],
    "moduleNameMapper": {
      "secret.json": "<rootDir>/__mocks__/secret.json"
    }
  }