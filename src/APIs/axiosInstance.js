import axios from "axios";
import { deserializeItems } from '../utils/helpers';
import { BASE_URL,ADMIN_BASE_URL } from '../constants/API.constant';

class AxiosInstance {
  // proc param will be used to call specific functions on backend.
  //e.g. proc 1 will call the get open orders i.e pending or client invoiced
  // e.g. proc 2 will get closed orders i.e. delivered
  async wimpieEstimate(payload){
    return await axios.post(`${ADMIN_BASE_URL}/wimpie`,payload);
  }

  async ordereEstimate(payload) {
    return await axios.post(`${BASE_URL}/wimpie`, payload);
  }

  async login(credentials) {
    return await axios.post(`${BASE_URL}/signin`, credentials);
  }

  async adminLogin(credentials) {
    return await axios.post(`${BASE_URL}/admin/signin`, credentials);
  }

  async postOrder(data,lineItemUnitPrice,lineItemUnitCost) {
    if((typeof data.purchaseOrders)==='string'){
      const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

    }
    const formData = new FormData();
    formData.append('id', localStorage.getItem('user_id'));
    formData.append('order_name', data.title);
    formData.append('customer_ref', data.reference);
    formData.append('week', data.week);
    formData.append('in_hands_date', data.date);
    formData.append('ship_address', data.shipAddress);
    formData.append('customer_notes', data.notes);
    formData.append('purchase_order', data.purchaseOrders);
    // formData.append('images_length', data.images.length);
    formData.append('reorder',data?.reorder);
    // for (let i = 0; i < data.images.length; i++) {
      // formData.append(`image${i}`, data.images[i]);
    // }
    for (let i=0; i<data.items.length; i++){
      if ( data.items[i].images){
        let item=`item${i}`;
        formData.append(item+'_length',data.items[i].images.length)
        for (let j=0; j<data.items[i].images.length; j++){
        let image=`image${j}`;
        formData.append(item+"_"+image,data.items[i].images[j])
        }
      }
    }
    formData.append('item_details', JSON.stringify(deserializeItems(data.items,lineItemUnitPrice,lineItemUnitCost)));
    await axios.post(BASE_URL + '/opportunity', formData);
  }
  async getAllOrders(id) {
    
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
  async searchFilter(data, orderType) {
    try {

    
      let id = localStorage.getItem('user_id');
      return await axios.get(
        BASE_URL + `/search?id=${id}&data=${JSON.stringify(data)}&order=${orderType}`
      );
    } catch (er) {
      console.log(er);
    }
  }
  async updateOrder(data, opp_ref, id) {
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
    
    for (let i=0; i<data.items.length; i++){
      if ( data.items[i].images){
        let item=`item${i}`;
        formData.append(item+'_length',data.items[i].images.length)
        for (let j=0; j<data.items[i].images.length; j++){
        let image=`image${j}`;
        formData.append(item+"_"+image,data.items[i].images[j])
        }
      }
    }
    formData.append('item_details', JSON.stringify(deserializeItems(data.items)));
    try {
      return axios.put(BASE_URL + `/opportunity?proc=3`, formData);
    } catch (error) {
      console.log(error);
    }
  }
  async createDraft(data) {
    let formData = new FormData();
    formData.append('name', data.title);
    formData.append('customer_ref', data.reference);
    formData.append('in_hands_date', data.date);
    formData.append('customer_notes', data.notes);
    formData.append('ship_to_address', data.shipAddress);
    formData.append('purchase_order', data.purchaseOrders);
    formData.append('items', JSON.stringify(data.items));
     for (let i=0; i<data.items.length; i++){
      if ( data.items[i].images){
        let item=`item${i}`;
        formData.append(item+'_length',data.items[i].images.length)
        for (let j=0; j<data.items[i].images.length; j++){
        let image=`image${j}`;
        formData.append(item+"_"+image,data.items[i].images[j])
        }
      }
    }
    try {
      return await axios.post(`${BASE_URL}/draft`, formData);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllDraft() {
    return await axios.get(`${BASE_URL}/draft`);
  }
  async deleteFromDraft(id) {
    return await axios.delete(`${BASE_URL}/draft?id=${id}`);
  }
  async updatadeDraft(data, id) {
    const formData = new FormData();
    formData.append('order_id', id);
    formData.append('name', data.title);
    formData.append('customer_ref', data.reference);
    formData.append('in_hands_date', data.date);
    formData.append('customer_notes', data.notes);
    formData.append('ship_to_address', data.shipAddress);
    formData.append('items', JSON.stringify(data.items));
    formData.append('purchase_order', data.purchaseOrders);
    for (let i=0; i<data.items.length; i++){
      if ( data.items[i].images){
        let item=`item${i}`;
        formData.append(item+'_length',data.items[i].images.length)
        for (let j=0; j<data.items[i].images.length; j++){
        let image=`image${j}`;
        formData.append(item+"_"+image,data.items[i].images[j])
        }
      }
    }
    try {
      return await axios.put(`${BASE_URL}/draft`, formData);
    } catch (error) {}
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