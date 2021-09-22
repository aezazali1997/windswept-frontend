import axios from "axios";
export const BASE_URL = 'https://windswept-backend.herokuapp.com';

class AxiosInstance {
    getUserInfo() {
        return localStorage.getItem("token");
    }

    getAuthHeader() {
        return { headers: { Authorization: "Bearer " + this.getUserInfo() } };
    }

    async ordereEstimate(payload) {
        return await axios.post(BASE_URL + "/api/wimpie", payload);
    }

    async login(credentials) {
        return await axios.post(BASE_URL + "/api/user/signin", credentials);
    }

    async adminLogin(credentials) {
        return await axios.post(BASE_URL + "/api/admin/signin", credentials);
    }

    async getUserType() {
        return await axios.get(BASE_URL + "/api/verify", this.getAuthHeader());
    }


}

export default new AxiosInstance();