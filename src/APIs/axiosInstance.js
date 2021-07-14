import axios from "axios";
export const USER_API_BASE_URL = `${process.env.BASE_URL}`;

class AxiosInstance {
    async ordereEstimate(data) {
        console.log('In OrderEstimate API')
        return await axios.post('https://windswept-backend.herokuapp.com' + "/api/quotation", data, this.getAuthHeader());
    }

    async login(credentials) {
        return await axios.post('https://windswept-backend.herokuapp.com' + "/api/user/signin", credentials);
    }

    getUserInfo() {
        return localStorage.getItem("token");
    }

    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }

}

export default new AxiosInstance;