import axios from "axios";
import {deserializeItems} from '../utils/helpers'
import {BOX_URL,BASE_URL} from '../constants/API.constant'
class AxiosInstance {
 
  async ordereEstimate(payload) {
    return await axios.post(BASE_URL + '/api/wimpie', payload);
  }

  async login(credentials) {
    return await axios.post(BASE_URL + '/signin', credentials);
  }

  async adminLogin(credentials) {
    return await axios.post(BASE_URL + '/api/admin/signin', credentials);
  }

  async postOrder(data){
    const formData = new FormData();
    formData.append('id',localStorage.getItem('user_id'))
    formData.append('order_name',data.title)
    formData.append('customer_ref',data.reference)
    formData.append('in_hands_date',data.date)
    formData.append('ship_address',data.shipAddress)
    formData.append('customer_notes',data.notes)
    formData.append('purchase_order',data.purchaseOrders)
    formData.append('images',data.images)
    formData.append('item_details',JSON.stringify(deserializeItems(data.items)))

    await axios.post(BASE_URL+'/opportunity',formData)
  }
  async getAllOrders(id) {
    // extract the login params and pass them
    return await axios.get(BASE_URL+`/opportunity?id=${JSON.stringify(id)}`,)
  }
   async loadImage(id){
    try {
    let res=await axios.get(BOX_URL+`/${id}`,{
      headers:{
        'Access-Control-Allow-Origin': "*",
        Authorization : "Bearer hH1PBQ2iWZSTpsd2MCbf1M5jam9yGJMB"
      }
    })
      console.log(res)
    }
    catch (error) {
      console.log(error)
    }
  }
  async deleteOrder(id) {
    try{
      return await axios.delete(BASE_URL+`/opportunity?id=${id}`)
    }
    catch(ex){
      console.log(ex);
    }
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