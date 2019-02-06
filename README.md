# vue-router-ssr-memory-leak

An illustration of a memory leak that occurs with Vue Router's `beforeRouteEnter` guard implementation.

To install siege:
```
brew install siege
```

To run:
```
npm run build
node --inspect server
siege http://localhost:8080/
```

The memory leak happens when the `router-view` is programmed to appear conditionally, and the component matching the view has a `beforeRouteEnter` guard **and** a callback is passed to it's `next(...)` method (e.g. `next(vm => {})`).

This will cause `vue-router` to poll every 16ms until the `router-view` materializes.

In a typical SSR application an instance of the app is created per request, which means the `router-view` will never appear, causing infinitely recursing `poll` methods.

This can be verified by checking the heap snapshot.
As the application is sieged, Timeout's will grow indefinitely, and profiling the CPU reveals that poll's are executing constantly in the event loop.


Note that this is probably not a problem for non-SSR applications.
