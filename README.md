# playwrightapi
An example of using playwright api testing for json placeholder api

## Getting Started

### Environment
Minimum required node version is v18.18.0, use mvm or other node version manager to set active version.

After cloning the repo into a folder, use the following command to install modules,

```
npm install
```
### Running the tests
The tests in this project are broken up in the following hierarchy,

* JSONPlaceholder
  - Post_Resource
  - User_Resource

To run tests for all of JSONPlaceholder there are two options,

```
npx playwright test --project chromium
```
or
```
npx playwright test --project chromium --grep 'JSONPlaceholder'
```

To run a subset of tests for a specific 'resource' then use a command similar to this,
```
npx playwright test --project chromium --grep 'Post_Resource'
```
