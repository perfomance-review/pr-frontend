import axios from 'axios';
import { notification } from 'antd';
const openNotification = () => {
  notification.open({
    message: 'Что-то пошло не так',
    description: 'Попробуйте обновить страницу',
  });
};
export default class PostService {
  static async getUserPolls() {
    try {
      const response = await axios.get('/api/polls');
      return response.data.polls;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
  static async getPoll(id) {
    try {
      const response = await axios.get('/api/polls/' + id);
      return response.data;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
  static async getQuestion(id) {
    try {
      const response = await axios.get('/api/comparepairsofpoll/' + id);
      return response.data;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
  static async startPoll(pollId, user_id) {
    try {
      const response = await axios.post('/api/start/' + pollId, user_id);
      return response.data;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
  static async updateWinner(object) {
    try {
      const response = await axios.post('/api/updatewinner/', object);
      return response.data;
    } catch (e) {
      openNotification();
      console.log(e);
      throw e;
    }
  }
}
