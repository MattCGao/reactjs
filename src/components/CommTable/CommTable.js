/**
 * Created by Matt on 18/10/16.
 *
 */
import React, { Component, PropTypes } from 'react'

import '../../styles/datatable.scss'
import 'datatables.net'

import {
  Table,
  Button,
  Grid,
  Pagination,
  Col,
  Row,
  Panel,
  PanelBody,
  PanelHeader,
  FormControl
} from '@sketchpixy/rubix'

import './CommTable.scss'

/**
 * Component CommTableHeader
 * Render the table header.
 */
const CommTableHeader = (props) => {
  if(!(Object.prototype.toString.call(props.titles) === '[object Array]')) {
    return (<thead><tr></tr></thead>)
  }

  return (
    <thead>
      <tr>
        {
          props.titles.map((t,i)=>{
            return(<th key={i}>{t}</th>)
          })
        }
      </tr>
    </thead>
  )
}

/**
 * Component CommTableBody
 * Render the table contents.
 */
const CommTableBody = (props) => {
  if(!(Object.prototype.toString.call(props.data)==='[object Array]')) {
    return (<tbody><tr></tr></tbody>)
  }

  const fields = props.showFields;
  const data = props.data;
  const others = props.others;

  return (
    <tbody>
      {
        data && data.map((t,i)=>{
          return (
            <tr key={i}>
              {
                // According the field name to show the data.
                fields.map((f,j)=>{
                  // 1. common data field type, 'fieldname'
                  if(t[f] || (String(t[f]) === 'null')){
                    return (
                      <td key={j}>
                        { (t[f] || '')}
                      </td>
                    )
                  }
                  // 2. <component /> or <container />
                  else if ((String(t[f]) === 'undefined') && (typeof f === 'object')){
                    return (
                      <td key={j}>
                        {React.cloneElement(f, {...t,...others})}
                      </td>
                    )
                  }
                  // 3. error field name.
                  else {
                    return (<td key={j}> {''}</td>)
                  }
                })
              }
            </tr>
          )
        })
      }
    </tbody>

  )
}

/**
 * Component CommTable
 * Render the table
 */
class CommTable extends React.Component {

  static propTypes = {
    titles: PropTypes.array,
    data: PropTypes.array,
    showFields: PropTypes.array,
    others: PropTypes.object,
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.isInitialized = false;
    this.tablename = this.props.name || 'table-notification';
    this.tablename_jquery = '#' + this.tablename;
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.data !== this.props.data) {
      if(!this.isInitialized) {
        setTimeout(()=>{
          $(this.tablename_jquery)
            .dataTable({
              "responsive": true,
              "order":[[0,"desc"]],
            });
        },0);

        this.isInitialized = true;
      }
    }    
  }

  render() {

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='commtable-lower-table'>
              <Table id={this.tablename}
                ref={(c)=>this.example = c}
                className='display'
                striped
                bordered
                condensed
                hover
              >
              <CommTableHeader titles={this.props.titles} />
              <CommTableBody data={this.props.data} showFields={this.props.showFields} others={this.props.others} />
              </Table>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }  
}

export default CommTable

