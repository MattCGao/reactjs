import NotificationRoute from 'routes/Notification'

describe('(Route) Notification', () => {
  let _route

  beforeEach(() => {
    _route = NotificationRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `notification`', () => {
    expect(_route.path).to.equal('notification')
  })
})
