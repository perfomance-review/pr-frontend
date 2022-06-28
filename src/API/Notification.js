import { notification } from 'antd';
export const openNotification = (message, description='') => {
  notification.open({
    message: message,
    description: description,
  });
};

export const openDefaultNotification = () => {
  openNotification('Что-то пошло не так', 'Попробуйте обновить страницу');
};
