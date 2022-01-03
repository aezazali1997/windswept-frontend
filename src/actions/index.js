
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
export const SaveDraftBegin = () => ({
    type: types.FETCH_DRAFT_BEGIN
});

export const receiveDraft = draft => ({
    type: types.RECIEVE_DRAFT,
    draft
})

export const EndDraft = () => ({
    type: types.FETCH_DRAFT_END
})

export const SaveDraft = (draft) => dispatch => {
  dispatch(SaveDraftBegin());

  dispatch(receiveDraft(draft));
  dispatch(EndDraft());
  return draft;
}


