export const LOAD_DATA = 'LOAD_DATA';
export const PUT_DATA = 'PUT_DATA';
export const GET_CLICKED_SONG = 'GET_CLICKED_SONG';

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

export const getClickedSong = (obj) => {
    return {
        type: GET_CLICKED_SONG,
        payload: obj
    }
}