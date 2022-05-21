import axios from 'axios';
import { notification } from 'antd';
const openNotification = () => {
  notification.open({
    message: 'Что-то пошло не так',
    description: 'Попробуйте обновите страницу',
  });
};
export default class PostService {
  static async getUserPolls() {
    try {
      const response = await axios.get('/api/polls');
      return response.data;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
}
