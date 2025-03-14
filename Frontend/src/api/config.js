import axios from 'axios';

class configService {
   baseUrl = 'http://localhost:3000/api/posts';


    async CreatePost(data){
        try {
          return await axios ({
                method : 'POST',
                url : `${this.baseUrl}/create`,
                data : data,
                withCredentials: true
            })
        } catch (error) {
            return error;
        }
        
    }

    async getAllPosts(){
        try {
            return await axios({
                method : 'GET',
                url : `${this.baseUrl}/`,
                withCredentials : true
            })
        } catch (error) {
            return error;
        }
    }

    async deletePost(id){
        try {
            return await axios({
                method : 'DELETE',
                url : `${this.baseUrl}/${id}`,
                withCredentials : true
            })
        } catch (error) {
            return error;
        }
    }

    async getUserPosts(id){
        try {
           return await axios({
                method : 'GET',
                url : `${this.baseUrl}/userId/${id}`,
                withCredentials : true
            })
        } catch (error) {
            return error;
        }
    }

    async getSinglePost(id){
        try {
           return await axios({
                method : 'GET',
                url : `${this.baseUrl}/${id}`,
                withCredentials : true
            })
        } catch (error) {
            return error ;
        }
    }
}


const configServiceInstance = new configService()

export default configServiceInstance