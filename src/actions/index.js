
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

export const OrderCacheBegin = () => ({
    type: types.CACHE_ORDER_BEGIN
});

export const storeOrderCache = (cache) => dispatch => {
    dispatch(OrderCacheBegin());
    dispatch(receiveCache(cache))
    return cache
}

export const receiveCache = cache => ({
    type: types.RECIEVE_CACHE_ORDER,
    cache
})
