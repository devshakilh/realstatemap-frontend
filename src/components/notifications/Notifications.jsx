// import { useState, useEffect } from 'react';
// import apiRequest from '../../lib/apiRequest';

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const response = await apiRequest.get('/notifications');
//       setNotifications(response.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       await apiRequest.put(`/notifications/${notificationId}`);
//       setNotifications(notifications.map((n) =>
//         n.id === notificationId ? { ...n, read: true } : n
//       ));
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   return (
//     <div className="notifications">
//       {notifications.map((notification) => (
//         <div
//           key={notification.id}
//           className={`notification ${notification.read ? 'read' : 'unread'}`}
//           onClick={() => markAsRead(notification.id)}
//         >
//           <span>{notification.message}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Notifications;


// src/components/notifications/Notification.jsx
import React from 'react';
import './Notification.scss';

const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
