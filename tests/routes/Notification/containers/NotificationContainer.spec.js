import React from 'react'
import { NotificationActionItem, NotificationTypeItem, NotificationHandleItemContainer, NotificationContainer } from 'routes/Notification'
import { render } from 'enzyme'

describe('(Components) NotificationActionItem', () => {
  let _component

  beforeEach(() => {
    _component = render(<NotificationActionItem type={['col1', 'col2']} />)
  })

  it('Renders a link', () => {
    const link = _component.find('a')
    expect(link).to.exist
    expect(link.text()).to.match(/View!/)
  })

})


describe('(Components) NotificationTypeItem', () => {
  let _component

  beforeEach(() => {
    _component = render(<NotificationTypeItem data={['data1', 'data2']} />)
  })

  it('Renders a div', () => {
    const div = _component.find('div')
    expect(div).to.exist
  })

  it('Renders a span', () => {
    const span = _component.find('span')
    expect(span).to.exist
  })


  
})

describe('(Components) NotificationHandleItemContainer', () => {
  let _component

  beforeEach(() => {
    _component = render(<NotificationHandleItemContainer type={['col1', 'col2']} data={['data1', 'data2']} />)
  })

  it('Renders a div', () => {
    const div = _component.find('div')
    expect(div).to.exist
    expect(div.text()).to.match(/View!/)
    
  })
  
})

describe('(Container) NotificationContainer', () => {
  let _container

  beforeEach(() => {
    _container = render(<NotificationContainer type={['col1', 'col2']} data={['data1', 'data2']} />)
  })

  it('Renders a div', () => {
    const div = _container.find('div')
    expect(div).to.exist    
  })
  
  it('Renders a table', () => {
    const table = _container.find('table')
    expect(table).to.exist
  })

  it('Renders a table header', () => {
    const header = _container.find('thead')
    expect(header).to.exist
  })
  
  it('Renders a table body', () => {
    const body = _container.find('tbody')
    expect(body).to.exist
  })
  
  it('Renders a table row', () => {
    const row = _container.find('tr')
    expect(row).to.exist
  })

  it('Renders a table cell', () => {
    const cell = _container.find('th')
    expect(cell).to.exist
  })



  
})
