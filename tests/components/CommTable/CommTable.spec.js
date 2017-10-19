import React from 'react'
import { CommTable, CommTableHeader, CommTableBody } from 'components/CommTable'
import { render } from 'enzyme'

describe('(Components) CommTableHeader', () => {
  let _component

  beforeEach(() => {
    _component = render(<CommTableHeader titles={['col1', 'col2']} />)
  })

  it('Renders a table header', () => {
    const header = _component.find('thead')
    expect(header).to.exist
  })

  it('Renders a table header row', () => {
    const row = _component.find('tr')
    expect(row).to.exist
  })

  it('Renders a table header cell', () => {
    const cell = _component.find('th')
    expect(cell).to.exist
  })




})


describe('(Components) CommTableBody', () => {
  let _component

  beforeEach(() => {
    _component = render(<CommTableBody data={['data1', 'data2']} />)
  })

  it('Renders a table body', () => {
    const body = _component.find('tbody')
    expect(body).to.exist
  })

  it('Renders a table body row', () => {
    const row = _component.find('tr')
    expect(row).to.exist
  })

  it('Renders a table body cell', () => {
    const cell = _component.find('th')
    expect(cell).to.exist
  })



  
})

describe('(Components) CommTable', () => {
  let _component

  beforeEach(() => {
    _component = render(<CommTable titles={['col1', 'col2']} data={['data1', 'data2']} />)
  })

  it('Renders a table', () => {
    const table = _component.find('table')
    expect(table).to.exist
  })

  it('Renders a table header', () => {
    const header = _component.find('thead')
    expect(header).to.exist
  })
  
  it('Renders a table body', () => {
    const body = _component.find('tbody')
    expect(body).to.exist
  })
  
  it('Renders a table row', () => {
    const row = _component.find('tr')
    expect(row).to.exist
  })

  it('Renders a table cell', () => {
    const cell = _component.find('th')
    expect(cell).to.exist
  })



  
})