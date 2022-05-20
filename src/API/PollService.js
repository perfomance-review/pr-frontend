import axios from 'axios';
import { notification } from 'antd';
const openNotification = (e) => {
    notification.open({
        message: 'Что-то пошло не так',
        description: e,
    });
};
export default class PostService {
    static async getUserPolls(){
        try {
            const response = await axios.get('/api/polls')
            return response.data
        }catch(e){
            openNotification(e)
        }
    }
}