/**
 * Show notifications list 
 * jump to cop according notifications.
 * 
 * Created by Matt Gao.
 * 
 */

import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'


import { IndexLink, Link, browserHistory } from 'react-router'

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

import './NotificationContainer.scss'
import ContentTop from '../../../components/ContentTop'
import CommTable from '../../../componentsCommTable'
import { fetchNotification, closeSingleNotification, closeAllNotifications } from '../modules/notification'

/**
 * Component NotificationActionItem
 * Create button view use view detail
 * @param props
 * @returns {JSX}
 * @constructor
 */
const NotificationActionItem = (props) => {
  return (
    <Link to={(props.type.includes('Support Request')) ? `/post/${props.actionid}` : `/cop/${props.location_lat}/${props.location_lon}`} >
      View
    </Link>        
  )
}

/**
 * Component NotificationTypeItem
 * Create circle by color
 * @param props
 * @returns {JSX}
 * @constructor
 */
const NotificationTypeItem = (props) => {
  const REDCOLOR = '#F55456';
  const YELLOCOLOR = '#F8E71C';
  const GREENCOLOR = '#B8E986';  

  if(!props) return (<div></div>);
  let cssUrl = 'notification-content-body-type';
  let bgColor = GREENCOLOR; // red #F55456, yellow #F8E71C, green #B8E986.
  
  if(props.type.toLowerCase().includes('distress') || props.type.toLowerCase().includes('emergency') || props.description.toLowerCase().includes('not safe')) {
    bgColor = REDCOLOR;
  }

  if(props.type.toLowerCase().includes('check') || props.type.toLowerCase().includes('walk')) {
    bgColor = YELLOCOLOR;
  }

  return (
       <div className={`${cssUrl}-box`}>
        <span className={`${cssUrl}-title`}>{props.type}</span>
        <div className={`${cssUrl}-flag`} style={{'backgroundColor': bgColor}}></div>
      </div>   
  )
}

/**
 * Container component NotificationHandleItemContainer
 */
class NotificationHandleItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleViewItem = this.handleViewItem.bind(this);
  }

  /**
   * Function handleViewItem
   * Send close notification and jump to different link
   */
  handleViewItem() {
    let url = (this.props.type.toLowerCase().includes('support')) ? `/post/${this.props.actionid}` : `/cop/${this.props.location_lat}/${this.props.location_lon}`;
    
    // 1. send close notification.
    this.props.user && this.props.user.current && this.props.handleCloseSingleNotification &&
      this.props.handleCloseSingleNotification(this.props.user.current.token, this.props.id);

    // 2. jump to different link.
    browserHistory.push(url);
  }

  /**
   * Render HTML
   * @returns {JSX}
   */
  render() {
    return (
        <div onClick={this.handleViewItem} className='notification-content-item'>
          View
        </div>
      )
  }
}

/**
 * Container component NotificationContainer
 */
class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.titles=['Date/Time','Type', 'User', 'Description', 'Action'];
    this.showFields=['created_at', (<NotificationTypeItem />), 'username', 'description', (<NotificationHandleItemContainer />)];

    this.handleClearAll = this.handleClearAll.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }

  /**
   * Function componentWillMount
   * Check current user and execute function fetchNotification to show all notification of current user
   */
  componentWillMount() {
    this.props.user.current && this.props.fetchNotification(this.props.user.current.token);   
  }

  /**
   * Function handleReload
   * Reload notification of current user
   */
  handleReload() {
    this.props.user.current && this.props.fetchNotification(this.props.user.current.token);   

    window.location.href = '/notification';
  }

  /**
   * Function handleClearAll
   * Check current current and execute function closeAllNotifications
   * Clear notification of current user after 1s
   */
  handleClearAll() {
    this.props.user.current && this.props.closeAllNotifications &&
      this.props.closeAllNotifications(this.props.user.current.token);
    
    setTimeout(function(){
      window.location.href = '/notification';        
    }, 1000);
    
  }

  /**
   * Function componentDidUpdate
   * Check condition then back notification
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if(!this.props.notification.notificationList.length && prevProps.notification.notificationList.length) {
      window.location.href = '/notification';
    }
  }

  /**
   * Render HTML
   * @returns {JSX}
   */
  render() {
    const list = this.props.notification.notificationList;
    const others = {
      user: this.props.user,
      handleCloseSingleNotification: this.props.closeSingleNotification,
    };

    return (
      <div className='notification-content-right'>
        <ContentTop title='Notification' badgeNo={this.props.notification.badgeNo} actionBtn='aaaa' />
        <div className='notification-content-body'>
          <Grid>
          <Row>
            <Col xs={12}>
            <div className="notification-content-body-lower-tools" style={{'right':'160px'}}>
              <Button bsStyle="primary" onClick={this.handleReload}>Reload</Button>
            </div>
            <div className="notification-content-body-lower-tools">
              <Button bsStyle="primary" onClick={this.handleClearAll}>Clear All</Button>
            </div>
              </Col>
            </Row>          
            <Row>
              <Col xs={12}>
                <div className='notification-content-body-lower-table'>
                  <CommTable 
                    titles={this.titles} 
                    data={list}
                    showFields={this.showFields}
                    others={others}
                  />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

/**
 * Function mapStateToProps
 * Return states include user and notification
 * @param state
 * @param ownProps
 * @returns {{user, notification: *}}
 */
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    notification: state.notification,
  }
}

/**
 * Function mapDispatchToProps
 * Return dispatches include fetchNotification, closeSingleNotification and closeAllNotifications
 * @param dispatch
 * @param ownProps
 * @returns {{fetchNotification: (function(*=)), closeSingleNotification: (function(*=, *=)), closeAllNotifications: (function(*=))}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNotification: (token) => {
      dispatch(fetchNotification(token));
    },
    closeSingleNotification: (token, id) => {
      dispatch(closeSingleNotification(token, id));
    },
    closeAllNotifications: (token) => {
      dispatch(closeAllNotifications(token));
    }
  }
}

/**
 * Export container component NotificationContainer with state and dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)

