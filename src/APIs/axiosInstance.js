import axios from "axios";
import { deserializeItems } from '../utils/helpers';
import { BOX_URL, BASE_URL } from '../constants/API.constant';

class AxiosInstance {
  // proc param will be used to call specific functions on backend.
  //e.g. proc 1 will call the get open orders i.e pending or client invoiced
  // e.g. proc 2 will get closed orders i.e. delivered
  async ordereEstimate(payload) {
    return await axios.post(BASE_URL + '/api/wimpie', payload);
  }

  async login(credentials) {
    return await axios.post(BASE_URL + '/signin', credentials);
  }

  async adminLogin(credentials) {
    return await axios.post(BASE_URL + '/api/admin/signin', credentials);
  }

  async postOrder(data) {
    const formData = new FormData();
    formData.append('id', localStorage.getItem('user_id'));
    formData.append('order_name', data.title);
    formData.append('customer_ref', data.reference);
    formData.append('week', data.week);
    formData.append('in_hands_date', data.date);
    formData.append('ship_address', data.shipAddress);
    formData.append('customer_notes', data.notes);
    formData.append('purchase_order', data.purchaseOrders);
    formData.append('images_length', data.images.length);
    for (let i = 0; i < data.images.length; i++) {
      formData.append(`image${i}`, data.images[i]);
    }
    formData.append('item_details', JSON.stringify(deserializeItems(data.items)));
    await axios.post(BASE_URL + '/opportunity', formData);
  }
  async getAllOrders(id) {
    // extract the login params and pass them
    return await axios.get(BASE_URL + `/opportunity?id=${id}&proc=1`);
  }
  async getClosedOrders(id) {
    try {
      return await axios.get(BASE_URL + `/opportunity?id=${id}&proc=2`);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteOrder(id) {
    try {
      return await axios.delete(BASE_URL + `/opportunity?id=${id}`);
    } catch (ex) {
      console.log(ex);
    }
  }
  async approveOrder(ref) {
    try {
      return await axios.put(BASE_URL + `/opportunity?proc=1&opp_id=${ref}`);
    } catch (error) {
      console.log(error);
    }
  }
  // async reOrder(ref) {
  //   try {
  //     return await axios.put(BASE_URL + `/opportunity?proc=2&opp_id=${ref}`);
  //   } catch (error) {}
  // }
  async searchFilter(data,orderType) {
    try {
      let id = localStorage.getItem('user_id');
      return await axios.get(BASE_URL + `/search?id=${id}&data=${JSON.stringify(data)}&order=${orderType}`);
    } catch (er) {
      console.log(er);
    }
  }
  async updateOrder(data,opp_ref,id){
    const formData = new FormData();
    formData.append('user_id', localStorage.getItem('user_id'));
    formData.append('opp_id', id);
    formData.append('opp_ref', opp_ref);
    formData.append('order_name', data.title);
    formData.append('customer_ref', data.reference);
    formData.append('week', data.week);
    formData.append('in_hands_date', data.date);
    formData.append('ship_address', data.shipAddress);
    formData.append('customer_notes', data.notes);
    formData.append('purchase_order', data.purchaseOrders);
    formData.append('images_length', data.images.length);
    for (let i = 0; i < data.images.length; i++) {
      formData.append(`image${i}`, data.images[i]);
    }
    formData.append('item_details', JSON.stringify(deserializeItems(data.items)));
    try {
      return axios.put(BASE_URL + `/opportunity?proc=3`, formData);
    } catch (error) {
      console.log(error);
    }
  
  }
  async checkDraftExist () {
   return await axios.get(`${BASE_URL}/draft?proc=1`);
  }
  async saveDraft(data) {
    let formData=new FormData();
    formData.append('name',data.title);
    formData.append('customer_ref',data.reference);
    formData.append('in_hands_date',data.date);
    formData.append('customer_notes',data.notes);
    formData.append('ship_to_address',data.shipAddress);
    formData.append('purchase_order',data.purchaseOrders);
    formData.append('image_length',data.images.length);
    formData.append('items',JSON.stringify(data.items));
    for (let i = 0; i < data.images.length; i++) {
      formData.append(`image${i}`, data.images[i]);
    }
      try {
        return await axios.post(`${BASE_URL}/draft`, formData);
      } catch (error) {
        console.log(error);
        
      }
  }
  async getAllDraft () {
    return await axios.get(`${BASE_URL}/draft?proc=2`)
  }
  // async getUserType() {
  //   return await axios.get(BASE_URL + '/api/verify', this.getAuthHeader());
  // getAuthHeader() {
  //   return { headers: { Authorization: 'Bearer ' + this.getUserInfo() } };
  //  getUserInfo() {
  //   return localStorage.getItem('token');
  // }
  // }
  // } commented by aezaz
}

export default new AxiosInstance();