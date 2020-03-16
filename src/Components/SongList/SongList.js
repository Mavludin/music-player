import React from 'react';
import classes from './SongList.module.css';

import { useDispatch } from 'react-redux';
import { getClickedSong } from '../../Store/Actions';

const SongList = ( {songList} ) => {

    const dispatch = useDispatch();

    const songListRender = songList.map((item)=> {
        return(
            <div onClick={()=>dispatch(getClickedSong(item))} className={classes.SongListCard} key={item.id}>
                <img src={item.albumCover} alt={`${item.artisst}-${item.track}`} />
                <div>
                    <h3>{item.track}</h3>
                    <p>{item.artist}</p>
                </div>
            </div>
        )
    });

    return (
        <div className={classes.SongList}>
            {songListRender}
        </div>
    ) 
}

export default SongList;