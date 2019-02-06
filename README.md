# vue-router-ssr-memory-leak

An illustration of a memory leak that occurs with Vue Router's before enter guard implementation.

The memory leak happens when the `router-view` appears conditionally, and the component matching the view has a `beforeRouteEnter` guard **and** a callback is passed to it's `next(...)` method (e.g. `next(vm => {})`).

This will cause `vue-router` to poll every 16ms until the `router-view` materializes.

In a typical SSR application an instance of the app is created per request, which means the `router-view` will never appear, causing infinitely recursing `poll` methods.

Note that this is probably not a problem for non-SSR applications.
