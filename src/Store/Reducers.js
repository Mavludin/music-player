import { PUT_DATA } from "./Actions";

const initialState = {
    data: {}
}

export const rootReducer = (state = initialState, action) => {

    if (action.type === PUT_DATA) {
        return {
            ...state,
            data: action.payload
        }
    }

    return state;
    
}