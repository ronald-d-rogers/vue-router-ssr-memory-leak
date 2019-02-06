import Router from 'vue-router'
import View from '../View'

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: View
      }
    ]
  })
}
