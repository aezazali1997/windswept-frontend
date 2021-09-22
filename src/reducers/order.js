import {
    RECIEVE_ORDER,
    RECIEVE_CACHE_ORDER,
    RECIEVE_DRAFT

} from "../constants/ActionTypes";

const initialState = {
    order: [],
    draft: [],
    cache: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case RECIEVE_ORDER:
            return {
                ...state,
                order: [...state.order, action.order]
            };
        case RECIEVE_DRAFT:
            return {
                ...state,
                draft: [...state?.draft, action.draft]
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