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
      return response.data;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
  static async getPoll(id) {
    try {
      const response = await axios.get('/api/polls/' + id);
      let poll = response.data;
      poll.respondentsCount = poll.respondents.length;
      poll.users = [];
      poll.selectedUsers = [];
      poll.respondents.forEach(function(item) {
        let u = {
          id: item.userId,
          name: item.secondName + " " + item.firstName,
        }
        poll.users.push(u);
        poll.selectedUsers.push(u.id);
      });
      return poll;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
  static async startPoll(pollId,user_id) {
    try {
      const response = await axios.post('/api/start/' + pollId, user_id);
      return response.data;
    } catch (e) {
      openNotification();
      console.log(e);
    }
  }
}
