import { notification } from 'antd';
export const openNotification = (message,description) => {
  notification.open({
    message: message,
    description: description,
  });
};
