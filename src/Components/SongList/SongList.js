import React, { useState, useEffect } from 'react';
import classes from './SongList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../../Store/Actions';

const SongList = ( {songList, onCardClick} ) => {

    const data = useSelector(state=>state.data);

    const songListRender = songList.map((item,pos)=> {
        return(
            <div onClick={()=>onCardClick(pos)} className={classes.SongListCard} key={item.id}>
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