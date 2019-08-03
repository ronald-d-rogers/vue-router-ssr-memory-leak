# vue-router-ssr-memory-leak

## Reproducing the Leak

An illustration of a memory leak that occurs with Vue Router's `beforeRouteEnter` guard implementation.

#### Install `siege`
```
brew install siege
```

#### Run
```bash
yarn build && yarn start
```

#### Siege
```
siege http://localhost:8080/
```

#### Profile CPU

1. Open the test site in Chrome (http://localhost:8080)

2. Open Developer Tools

3. DevTools - Node.js (green hexagonal button)

4. Go to the Profiler tab and click Start.

5. After about 5 seconds, Stop, and review the recording.

#### Explanation

The memory leak happens when the `router-view` is programmed to appear conditionally, and the component matching the view has a `beforeRouteEnter` guard **and** a callback is passed to it's `next(...)` method (e.g. `next(vm => {})`).

This will cause `vue-router` to poll every 16ms until the `router-view` materializes.

In a typical SSR application an instance of the app is created per request, which means the `router-view` will never appear, causing infinitely recursing `poll` methods.

This can be verified by taking a CPU profile.
As the application is sieged, Timeout's will grow indefinitely, and profiling the CPU reveals that `poll`s are executing constantly in the event loop.

Note that this is probably not a problem for non-SSR applications.

## Testing the Fix

### Build Vue Router

#### Clone `ronald-d-rogers/vue-router`
```
git clone git@github.com:ronald-d-rogers/vue-router.git
```

#### Build and link
```
cd vue-router
yarn && yarn build && yarn link
```

### Build Vue Server Renderer

#### Clone `ronald-d-rogers/vue`
```
cd ..
git clone git@github.com:ronald-d-rogers/vue.git
```

#### Checkout the fix branch
```
cd vue
git checkout ssr-request-cleanup
```

#### Build
```
yarn && yarn build:ssr
```

#### Link the fixed `vue-server-renderer`
```
cd packages/vue-server-renderer
yarn link
```

### Running the Fix

#### Link the fixed `vue-router` and `vue-server-renderer`
```
# in vue-router-ssr-memory-leak
yarn link "vue-router"
yarn link "vue-server-renderer"
```

#### Run
```
yarn build:fix && yarn start
```

#### Siege
```
siege http://localhost:8080/
```

#### Explanation

If we profile the CPU now, the memory leak is gone.

```es6
// entry-server-fixed.js
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context)

    const { url } = context

    router.push(url)

    router.onReady(() => {
      //resolve(app)
      resolve({ app, onComplete() { app.$destroy() } })
    }, reject)
  })
}
```

The change to `vue-server-render` allows us to call `app.$destroy` when the request is complete:

```es6
resolve({ app, onComplete() { app.$destroy() } })
```

This sets `app._isBeingDestroyed` to `true`.

`vue-router`'s `poll` method is leaking into memory every request:
```es6
function poll (
  cb: any, // somehow flow cannot infer this is a function
  instances: Object,
  key: string,
  isValid: () => boolean
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key])
  } else if (isValid()) {
    setTimeout(() => {
      poll(cb, instances, key, isValid)
    }, 16)
  }
}
```
It uses `isValid` to stop itself from recursing:
https://github.com/vuejs/vue-router/blob/fc42d9cf8e1d381b885c9af37003198dce6f1161/src/history/base.js#L348

So we update the `isValid` method to check if the app is being destroyed.

```diff
- const isValid = () => this.current === route
+ const isValid = () => {
+ if (app && app._isBeingDestroyed) {
+   return false
+ }
+ return this.current === route
+ }
```

Setting `app._isBeingDestroyed` to `true` by calling `app.$destroy`, and checking if the app is being destroyed in `isValid` short-circuits the leaking `poll`s.
