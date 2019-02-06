import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { createRouter } from './router'

Vue.use(VueRouter)

export function createApp() {
  const router = createRouter()

  const app = new Vue({
    router,
    render: h => h(App)
  })

  return { app, router }
}
