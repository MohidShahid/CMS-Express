import axios from 'axios';

class AuthService {
    baseUrl

    constructor(){
        this.baseUrl = "http://localhost:3000/api/user/";
    };

async sendRequest(method, endpoint = "", pathParams = "", data = {}) {
    try {
        const url = `${this.baseUrl}${endpoint ? `${endpoint}` : ""}${pathParams ? `/${pathParams}` : ""}`;

        const response = await axios({
            method,
            url,
            data,
            headers: { "Content-Type": "application/json" },
            withCredentials : true
        });
        return response;

    } catch (error) {
        return error
    }
}



     async registerUser(data){
          return await this.sendRequest('POST' ,"register", "" , data);
    }

    async loginUser(data) {
        try {
            const response = await this.sendRequest('POST', "login", "", data);
            return response.data;  
        } catch (error) { 
    
            return error.response;
        }
    }
    
       
    

    async logoutUser (){
       return await this.sendRequest('POST' , "logout");
    }
    async getAllUser(){
        return await this.sendRequest('GET')
    }

    async getSession() {
        try {
            const response = await this.sendRequest('GET', "verifySession");
            return response.data; // Return only the response data
        } catch (error) {
            console.error("Session verification failed:", error.message);
            return null; // Handle errors gracefully
        }
    }

    async fileUpload (data){
        try {
           const response = await axios ({
                method : 'POST',
                url : `${this.baseUrl}upload`,
                data : data,
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure proper file handling
                },
                withCredentials : true
            })
            return response
        } catch (error) {
            return error
        }
       
    }
    
};

const authService = new AuthService();
export default authService;