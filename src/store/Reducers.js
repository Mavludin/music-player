import { PUT_DATA, GET_SONG, PLAY_SONG, PAUSE_SONG } from "./Actions";

const initialState = {
    data: null,
    currentSong: null,
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

    if (action.type === PLAY_SONG) {
        return {
            ...state,
            songPlayed: true
        }
    }

    if (action.type === PAUSE_SONG) {
        return {
            ...state,
            songPlayed: false
        }
    }

    if (action.type === GET_SONG) {
        return {
            ...state,
            currentSong: action.payload,
            songPlayed: true
        }
    }

    return state;

}