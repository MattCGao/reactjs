import CommTableComponent from 'components/CommTable'

describe('(Components) CommTable', () => {
  let _route

  beforeEach(() => {
    _route = CommTableComponent({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `commtable`', () => {
    expect(_route.path).to.equal('commtable')
  })
})
