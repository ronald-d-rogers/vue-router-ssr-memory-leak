import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context)

    const { url } = context

    router.push(url)

    router.onReady(() => {
      resolve(app)
    }, reject)
  })
}
