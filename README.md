# static-mock-api
Lightweight ExpressJs API mock server, based on static JSON files.

[![CodeQL](https://github.com/freezable/mock-api/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/freezable/mock-api/actions/workflows/codeql-analysis.yml)
[![Node.js CI](https://github.com/freezable/mock-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/freezable/mock-api/actions/workflows/node.js.yml)

## What does it do?

Static-Mock-API was written to mock a simple API easy. API calls are will get response, based on static JSON files.
As an example of your mock directory:
```
+ api
  + swapi
    + people
      + 1
        - 200.json
      - 200.json
    + planets
      - 200.json
```

## Installation

    npm install static-mock-api

## Usage

```javascript
const StaticMockApi = require("static-mock-api");

const server = new StaticMockApi();
server.start();
```
