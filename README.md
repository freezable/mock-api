# static-mock-api
Lightweight ExpressJs API mock server, based on static JSON files.

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