import axios from 'axios';

class AuthService {
    baseUrl

    constructor(){
        this.baseUrl = "http://localhost:3000/api/user/";
    };

    async sendRequest(method , endpoint="", pathParams = "" , data = {}){
        try {
            const url = `${this.baseUrl}${endpoint ? `${endpoint}` : ""}${pathParams ? `/${pathParams}` : ""}`;
            const response = await axios({
                 method,
                 url,
                 data,
                 headers : {"Content-Type" : "application/json"}
             })
             return response.data;
        } catch (error) {
            return error.message;
        }

    }


     async registerUser(data){
          return await this.sendRequest('POST' ,"register", "" , data);
    }

    async loginUser(data){
        return await this.sendRequest('POST' ,"login", "" , data);
    }

    async logoutUser (){
       return await this.sendRequest('POST' , "logout");
    }
    async getUser(){
        return await this.sendRequest('GET')
    }
};

const authService = new AuthService();
export default authService;