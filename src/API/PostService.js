import axios from 'axios';
export default class PostService {
    static async getUserPolls(){
        try {
            const response = await axios.get('/api/polls')
            return response.data
        }catch(e){
            console.log(e)
        }
    }
}