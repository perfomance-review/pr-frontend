import axios from 'axios';
import { openNotification } from '../API/Notification';

export default class PostService {
  static async getUser() {
    try {
      const response = await axios.get('/api/getuser/');
      return response.data;
    } catch (e) {
      openNotification('Что-то пошло не так','Попробуйте обновить страницу');
      console.log(e);
    }
  }
  static async login(loginInfo) {
    try {
      const response = await axios.post('/api/auth/login/', loginInfo);
      return response.data;
    } catch (e) {
      openNotification('Что-то пошло не так','Попробуйте обновить страницу');
      console.log(e);
    }
  }
}