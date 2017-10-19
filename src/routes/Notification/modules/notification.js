/**
 * Created by Matt Gao.
 * 
 */

/* @flow */
import { USER_API } from '../../../utility/api';
import fetch from 'isomorphic-fetch';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_NOTIFICATION_LIST_START = 'FETCH_NOTIFICATION_LIST_START';
export const FETCH_NOTIFICATION_LIST_DONE = 'FETCH_NOTIFICATION_LIST_DONE';

export const CLOSE_SINGLE_NOTIFICATION_START = 'CLOSE_SINGLE_NOTIFICATION_START'
export const CLOSE_SINGLE_NOTIFICATION_DONE = 'CLOSE_SINGLE_NOTIFICATION_DONE'

export const CLOSE_ALL_NOTIFICATIONS_START = 'CLOSE_ALL_NOTIFICATIONS_START'
export const CLOSE_ALL_NOTIFICATIONS_DONE = 'CLOSE_ALL_NOTIFICATIONS_DONE'

// ------------------------------------
// Actions
// ------------------------------------

/**
 * fetch all notifications.
 */
export function fetchNotificationStart() {
  return {
    type: FETCH_NOTIFICATION_LIST_START,
  }
}

/**
 * Function is action with name is fetchNotificationDone
 * @param list
 * @param msg
 * @param success
 * @returns {{type: string, list: array, message: *, success: *}}
 */
export function fetchNotificationDone(list, msg, success) {
  return {
    type: FETCH_NOTIFICATION_LIST_DONE,
    list: list,
    msg: msg,
    success: success
  }
}

/**
 * Function fetchGroupDetails
 * @param token
 * @returns {function(*, *)}
 */
export function fetchNotification(token) {
  return (dispatch, getState) => {
    dispatch(fetchNotificationStart());
    fetch(USER_API.fetchNotificationList.url, {
      method: USER_API.fetchNotificationList.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': USER_API.fetchNotificationList.auth + token,
      }
    }).then(response=>{
      return response.json()
    }).then(json=>{
      // console.warn('Fetch notification response: ', json);
      if(parseInt(json.status_code)>200){
        dispatch(fetchNotificationDone(json.data, 'Fetch notification list error. ', false))
      } else {
        dispatch(fetchNotificationDone(json.data, 'Fetch notification successfully.', true))
      }
    });
  }
}

/**
 * close a single notification by id.
 * 
 */
export function closeSingleNotificationStart(){
  return {
    type: CLOSE_SINGLE_NOTIFICATION_START,
  }
}

/**
 * Function is action with name is closeSingleNotificationDone
 * @param data
 * @param msg
 * @param success
 * @returns {{type: string, data: array, message: *, success: *}}
 */
export function closeSingleNotificationDone(data, msg, success){
  return {
    type: CLOSE_SINGLE_NOTIFICATION_DONE,
    data: data,
    msg: msg,
    success: success,
  }
}

/**
 * Function fetchGroupDetails
 * @param token
 * @param id
 * @returns {function(*, *)}
 */
export function closeSingleNotification(token, id) {
  let url = USER_API.closeSingleNotification.url + '' + id; 
  return (dispatch, getState) => {
    dispatch(closeSingleNotificationStart());
    fetch( url, {
      method: USER_API.closeSingleNotification.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': USER_API.closeSingleNotification.auth + token,
      }
    }).then(response=>{
      return response.json();
    }).then(json=>{
      if(parseInt(json.status_code)>200){
        dispatch(closeSingleNotificationDone(json.data, 'Close the notification error.', false));
      } else {
        dispatch(closeSingleNotificationDone(json.data, 'Close the notification success', true));
      }
    });
  }
}

/**
 * close all notifications
 * 
 */
export function closeAllNotificationsStart() {
  return {
    type: CLOSE_ALL_NOTIFICATIONS_START,
  }
}

/**
 * Function is action with name is closeAllNotificationsDone
 * @param data
 * @param msg
 * @param success
 * @returns {{type: string, data: array, message: *, success: *}}
 */
export function closeAllNotificationsDone(data, msg, success) {
  return {
    type: CLOSE_ALL_NOTIFICATIONS_DONE,
    data: data,
    msg: msg,
    success: success
  }
}

/**
 * Function closeAllNotifications
 * @param token
 * @returns {function(*, *)}
 */
export function closeAllNotifications(token) {
  return (dispatch, getState) => {
    dispatch(closeAllNotificationsStart());
    fetch(USER_API.closeAllNotifications.url, {
      method: USER_API.closeAllNotifications.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': USER_API.closeAllNotifications.auth + token,
      }
    }).then (response=>{
      return response.json;
    }).then (json=>{
      if(parseInt(json.status_code)>200){
        dispatch(closeAllNotificationsDone(json.data, 'Close all notifications error.', false))
      } else {
        dispatch(closeAllNotificationsDone(json.data, 'Close all notifications success', true))
      }
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const NOTIFICATION_ACTION_HANDLERS = {
  [FETCH_NOTIFICATION_LIST_START]: (state, action) => {
    return ({...state, fetching: true, systemMessage:''})
  },
  [FETCH_NOTIFICATION_LIST_DONE]: (state, action) => {
    return ({...state, notificationList: action.list, systemMessage: action.msg, fetching: false})
  },
  [CLOSE_SINGLE_NOTIFICATION_START]: (state, action) => {
    return ({...state, fetching: true, systemMessage:''})
  },
  [CLOSE_SINGLE_NOTIFICATION_DONE]: (state, action) => {
    return ({...state, systemMessage: action.msg, fetching: false})
  },
  [CLOSE_ALL_NOTIFICATIONS_START]: (state, action) => {
    return ({...state, systemMessage: '', fetching: true})
  },
  [CLOSE_ALL_NOTIFICATIONS_DONE]: (state, action) => {
    return ({...state, systemMessage:'', fetching: false, notificationList: (action.success) ? [] : state.notificationList})
  },
}

// ------------------------------------
// Reducers
// ------------------------------------
const initialState = {
  fetching: false,
  notificationList: [],
  systemMessage: '',
}

export default function notificationReducer (state=initialState, action) {
  const handler = NOTIFICATION_ACTION_HANDLERS[action.type];

  return (handler ? handler(state, action) : state);
}

