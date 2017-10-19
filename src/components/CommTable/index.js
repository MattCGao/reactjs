/**
 * Accept three arrays (titles, showFields, data, others(optional))
 * render the table based on datatable.
 * table ordered in the first column by descent.
 * 
 * Created by Matt on 18/10/16
 * used in route/Notification/containers/NotificationContainer.js
 * 
 * such as:
 * 
 *   this.titles=['Date/Time','Type', 'User', 'Description', 'Action'];
 *   this.showFields=['created_at', (<NotificationTypeItem />), 'username', 'description', (<NotificationHandleItemContainer />)];
 *   const others = {
 *       user: this.props.user,
 *       handleCloseSingleNotification: this.props.closeSingleNotification,
 *    }; // can pass through any thing if any sub-components need.
 * 
 * <CommTable 
 *   titles={this.titles} 
 *   data={this.props.notification.notificationList}
 *   showFields={this.showFields}
 *   others={others}
 *  />
 * 
 */
import CommTable from './CommTable'

export default CommTable