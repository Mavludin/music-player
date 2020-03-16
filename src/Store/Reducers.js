import { PUT_DATA, GET_CLICKED_SONG } from "./Actions";

const initialState = {
    data: {},
    currentSong: {},
    songPlayed: false
}

export const rootReducer = (state = initialState, action) => {

    if (action.type === PUT_DATA) {
        return {
            ...state,
            data: action.payload,
            currentSong: action.payload[0]
        }
    }

    if (action.type === GET_CLICKED_SONG) {
        return {
            ...state,
            currentSong: action.payload,
            songPlayed: true
        }
    }

    return state;

}