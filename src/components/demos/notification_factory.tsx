import React, { useState } from 'react';

enum NotificationCategory {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  DEFAULT = 'DEFAULT',
}

type NotificationType = {
  type: NotificationCategory;
  message: string;
  timestamp: string;
};

function successNotification(message) {
  this.type = NotificationCategory.SUCCESS;
  this.message = message;
  this.timestamp = JSON.stringify(Date.now());
}

function failureNotification(message) {
  this.message = message;
  this.type = NotificationCategory.FAILURE;
  this.timestamp = JSON.stringify(Date.now());
}

function defaultNotification(message) {
  this.message = message;
  this.type = NotificationCategory.DEFAULT;
  this.timestamp = JSON.stringify(Date.now());
}

function addNotification(type, message) {
  switch (type) {
    case NotificationCategory.SUCCESS:
      return new successNotification(message);
    case NotificationCategory.FAILURE:
      return new failureNotification(message);
    default:
      return new defaultNotification(message);
  }
}

const NotificationFactory = () => {
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const handleClick = notificationType => {
    const newNotification = addNotification(notificationType, message);

    setNotifications(prevState => [...prevState, newNotification]);
  };

  const notificationsList = notifications.map(notification => {
    return (
      <li key={notification.timestamp}>
        [{notification.type}]: "{notification.message}"
      </li>
    );
  });

  return (
    <div className="demo notification-factory">
      <p>Notification Factory</p>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={() => handleClick(NotificationCategory.SUCCESS)}>
        Success
      </button>
      <button onClick={() => handleClick(NotificationCategory.FAILURE)}>
        Failure
      </button>
      <button onClick={() => handleClick(NotificationCategory.DEFAULT)}>
        Default
      </button>
      <ul>{notificationsList}</ul>
    </div>
  );
};

export default NotificationFactory;
