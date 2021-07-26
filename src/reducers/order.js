import {
    RECIEVE_ORDER,
    RECIEVE_CACHE_ORDER
} from "../constants/ActionTypes";

const initialState = {
    order: [],
    cache: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case RECIEVE_ORDER:
            return {
                ...state,
                order: action.order
            };
        case RECIEVE_CACHE_ORDER:
            return {
                ...state,
                cache: action.cache
            };
        default:
            return state;
    }
};
export default orderReducer;