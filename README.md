# Dependancies Note:

Dependancies to be update when we move to Vue-CLI. They require WebPack 4 and/or Babel 7:

* @storybook/addon-actions
* @storybook/addon-links
* @storybook/addon-storyshots
* @storybook/addon-viewport
* @storybook/addons
* @storybook/vue
* babel-loader
* css-loader
* file loader
* vue-apollo
* vue-loader
* webpack
* webpack-dev-middleware

# bloomberg-bna-front-end

## Features

* Server Side Rendering (SSR)
* Vue + vue-router + vuex working together
* Server-side data pre-fetching
* Client-side state & DOM hydration
* Automatically inlines CSS used by rendered components only
* Single-file Vue Components
* Hot-reload in development
* CSS extraction for production

## Requirements

* Node v8+

## Documentation

* [Vue 2.0](https://vuejs.org/v2/guide/)
* [Vuex 2.0](https://vuex.vuejs.org/en/intro.html)
* [Vue Router](https://router.vuejs.org/en/essentials/getting-started.html)
* [Vue Apollo](https://github.com/Akryum/vue-apollo)
* [Jest Testing Framework ](http://facebook.github.io/jest/docs/en/getting-started.html)
* [Vue.js Unit Testing Library](https://vue-test-utils.vuejs.org/en/)
* [Nightwatch.js Browser Testing Framework](http://nightwatchjs.org/guide)

## Plugins

#### VSCode

* Vetur
* GraphQL for VSCode
* PostCSS syntax
* Jest
* ESlint
* Prettier
* Cucumber (Gherkin) Full Support

#### Chrome

* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
* [Apollo devtools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

## Build Setup

```bash
# install yarn (Mac OS X) if you haven't already
brew install yarn
```

```bash
# install dependencies
yarn

# serve in development mode, with hot reload at localhost:8080
export API_URL=https://bwrite-q.bna.com
export PROFILE_URL=https://profile-q.bna.com
export ESSENTIAL_URL=https://essential-q.bna.com
export WSAUTH_URL=https://wsauth-q.bna.com
export ADOBE_ANALYTICS_URL=https://assets.adobedtm.com/7d0037c78b661f04e91c8d04a01540069a056d85/satelliteLib-06d95704be176ae5f4255900ea04082e2df82d65-staging.js
export PORT=8080
yarn run local

# build
yarn build

# serve
export API_URL=https://bwrite.bna.com
export PROFILE_URL=https://profile.bna.com
export ESSENTIAL_URL=https://essential.bna.com
export WSAUTH_URL=https://wsauth.bna.com
export ADOBE_ANALYTICS_URL=https://assets.adobedtm.com/7d0037c78b661f04e91c8d04a01540069a056d85/satelliteLib-06d95704be176ae5f4255900ea04082e2df82d65.js
export PORT=80
yarn run start

# build rpm for distribution
./gradlew rpm
```

## Run Tests

### Unit Test

```bash
# run all unit tests with coverage
yarn test:unit

# run all unit tests
jest

# watch all unit tests
jest --watch

# run all test suites related to changed files
jest -o

# to run a specific test suite
jest test/unit/specs/TestName.spec.js
```

### Run Storyshot Tests

```bash
# in a new tab/window run storybook
yarn run storybook

# in a different tab/window run snapshot tests
yarn run test:storyshots

# update the storyshots
yarn run test:storyshots -u
```

### E2E Tests

Use Assert rather than Chai Expect for constancy and Chai Expect method chaining limitations.

```bash
# run all e2e tests locall
export E2E_TEST_URL=http://yourmachinename.intdom.bna.com:8080
export E2E_TEST_WORKERS=auto

# run all e2e tests on production
export E2E_TEST_URL=https://bnanews.bna.com
export E2E_TEST_WORKERS=auto

# the e2e test url must be a bna.com domain like http://tholinka01lm.intdom.bna.com:8080
yarn test:e2e

# to run a specific e2e test suite
yarn nightwatch -c ./test/e2e/nightwatch.conf.js test/e2e/specs/TestName.spec.js
```

### Cucumber Features

Use to regenerate the feature files from JIRA

```bash
# regenerate cucumber feature files
JIRA_URL=https://jira.bna.com JIRA_USERNAME=... JIRA_PASSWORD=... node features.js
```

### Cucumber Tests

```bash
# run all cucumber tests local
export E2E_TEST_URL=http://yourmachinename.intdom.bna.com:8080

# run all cucumber tests on production
export E2E_TEST_URL=https://bnanews.bna.com

# the cucumber test url must be a bna.com domain like http://tholinka01lm.intdom.bna.com:8080
yarn test:cucumber

# run tests for a specific feature
BABEL_ENV=cucumber yarn run wdio --spec features/Article.feature
```

### All Tests

```bash
# run unit and e2e tests
yarn run test
```

## Misc.

### Refetching the GraphQL schema

Changes to BWrite's GraphQL schema that affect Apollo's ability to introspect fragments in GraphQL queries require the schema to be refetched and the `fragments-schema.json` file to be rebuilt:

```bash
yarn run fetch:schema
```

## Docker

### Build

```bash
docker build -t news .
```

### Run

Make sure you have registered news-local.bna.com in your etc/hosts file

```bash
docker run -p 8080:8080 --rm --name news-cont --add-host news-local.bna.com:127.0.0.1 --env-file=./env/tst.env --env-file=./env/sys.env news
```

to stop use docker stop news-cont
