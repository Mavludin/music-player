import React from 'react';
import classes from './SongList.module.css';

import { useDispatch } from 'react-redux';
import { loadData } from '../../Store/Actions';

const SongList = (props) => {

    const songListRender = props.songList.map((item,pos)=> {

        return(
            <div onClick={()=>props.onCardClick(pos)} className={classes.SongListCard} key={item.id}>
                <img src={item.albumCover} alt={`${item.artisst}-${item.track}`} />
                <div>
                    <h3>{item.track}</h3>
                    <p>{item.artist}</p>
                </div>
            </div>
        )
    });

    const dispatch = useDispatch();
    const onClick = () => dispatch(loadData());

    return (
        <div className={classes.SongList}>
                <button onClick={onClick}>Click me</button>

            {songListRender}
        </div>
    ) 
}

export default SongList;