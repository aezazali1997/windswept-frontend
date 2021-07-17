
// import axiosInstance from '../Apis/axiosapi';

import * as types from '../constants/ActionTypes'


export const fetchOrderBegin = () => ({
    type: types.FETCH_ORDER_BEGIN
});

export const storeOrder = (order) => dispatch => {
    dispatch(fetchOrderBegin());
    dispatch(receiveWebsite(order))
    return order
}

export const receiveWebsite = order => ({
    type: types.RECIEVE_ORDER,
    order
})
