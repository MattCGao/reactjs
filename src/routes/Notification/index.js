/**
 * Created by Matt Gao.
 * 
 * 
 */

import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'notification',
  getComponent (nextState, next) {
    require.ensure([
      './containers/NotificationContainer',
      './modules/notification'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
       will not loaded until the router invokes this callback. */
      const NotificationContainer = require('./containers/NotificationContainer').default;
      const notificationReducer = require('./modules/notification').default;

      injectReducer(store, {
        key: 'notification',
        reducer: notificationReducer
      })

      next(null, NotificationContainer)
    })
  }
})

