import {
    RECIEVE_ORDER,
} from "../constants/ActionTypes";

const initialState = {
    order: [],

};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case RECIEVE_ORDER:
            return {
                ...state,
                order: action.order
            };
        default:
            return state;
    }
};
export default orderReducer;