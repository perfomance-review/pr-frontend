import axios from 'axios';
import { openDefaultNotification } from '../API/Notification';
export default class PostService {
  static async getRespondentPolls(statuses) {
    try {
      const params = new URLSearchParams();
      statuses.forEach((status) => {
          params.append('status', status);
      })
      const response = await axios.get('/api/polls', {params})
      return response.data.polls;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getManagerPolls() {
    try {
      const response = await axios.get('/api/pollsmanager')
      return response.data.polls;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getPoll(id) {
    try {
      const response = await axios.get('/api/polls/' + id);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getOverallRating(id) {
    try {
      const response = await axios.get('/api/rating/' + id);
      return response.data.questionsAndUsersWithScore;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getUserResult(id) {
    try {
      const response = await axios.get('/api/result/' + id);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getUserResultForManager(pollId,userId) {
    try {
      const response = await axios.get('/api/result/' + pollId + '/' + userId);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async getQuestion(id) {
    try {
      const response = await axios.get('/api/comparepairsofpoll/' + id);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async startPoll(pollId, user_id) {
    try {
      const response = await axios.post('/api/start/' + pollId, user_id);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
  static async updateWinner(object) {
    try {
      const response = await axios.post('/api/updatewinner/', object);
      return response.data;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
      throw e;
    }
  }
  static async getRating(pollId) {
    try {
      const response = await axios.get('/api/rating/' + pollId);
      return response.data.questionsAndUsersWithScore;
    } catch (e) {
      openDefaultNotification();
      console.log(e);
    }
  }
}