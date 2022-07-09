import axios from 'axios';
import { openDefaultNotification } from '../API/Notification';

export default class UserService {
  static async getUser() {
    try {
      const response = await axios.get('/api/getuser/');
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getViewedUser(userId) {
    try {
      const response = await axios.get('/api/getuser/' + userId);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getUsers() {
    try {
      const response = await axios.get('/api/respondents/');
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getQuestions() {
    try {
      const response = await axios.get('/api/questions/');
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async login(loginInfo) {
    try {
      const response = await axios.post('/api/auth/login/', loginInfo);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
}