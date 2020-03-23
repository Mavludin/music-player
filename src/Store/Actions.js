export const LOAD_DATA = 'LOAD_DATA';
export const PUT_DATA = 'PUT_DATA';
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const GET_SONG = 'GET_SONG';

export const putData = (dataFromServer) => {
    return {
        type: PUT_DATA,
        payload: dataFromServer
    }
}

export const loadData = () => {
    return {
        type: LOAD_DATA
    }
}

export const playSong = () => {
    return {
        type: PLAY_SONG
    }
}

export const pauseSong = () => {
    return {
        type: PAUSE_SONG
    }
}

export const getSong = (obj) => {
    return {
        type: GET_SONG,
        payload: obj
    }
}