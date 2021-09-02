import axios from "axios";
export const BASE_URL = 'https://windswept-backend.herokuapp.com';

class AxiosInstance {
    async ordereEstimate(payload) {
        console.log('In OrderEstimate API')
        return await axios.post(BASE_URL + "/api/wimpie", payload);
    }

    async login(credentials) {
        return await axios.post(BASE_URL + "/api/user/signin", credentials);
    }

    async adminLogin(credentials) {
        return await axios.post(BASE_URL + "/api/admin/signin", credentials);
    }

    getUserInfo() {
        return localStorage.getItem("login");
    }

    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }

}

export default new AxiosInstance();