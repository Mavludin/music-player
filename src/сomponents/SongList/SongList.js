import React from 'react';
import classes from './SongList.module.css';

import Scroll from 'react-scroll';

import { useDispatch } from 'react-redux';
import { getSong } from '../../store/Actions';

const SongList = ( {songList} ) => {

    const dispatch = useDispatch();

    const scrollToPLayer = () => {
        const player = document.querySelector('.MusicPlayer_MusicPlayer__2mjBP');
        Scroll.animateScroll.scrollTo(parseInt(player.offsetTop));
    }

    const songListRender = songList.map((item)=> {
        return(
            <div onClick={()=>{dispatch(getSong(item)); scrollToPLayer();}} className={classes.SongListCard} key={item.id}>
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