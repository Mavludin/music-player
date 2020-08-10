import React from 'react';
import classes from './SongList.module.css';

import Scroll from 'react-scroll';

import { useDispatch } from 'react-redux';
import { getSong } from '../../store/Actions';

export const SongList = ( {songList, musicPlayer} ) => {

    const dispatch = useDispatch();

    const scrollToPLayer = () => {
        if (musicPlayer.current.offsetTop !== null) {
            Scroll.animateScroll.scrollTo(parseInt(musicPlayer.current.offsetTop));
        }
    }

    const songListRender = songList.map((item)=> {
        return(
            <div onClick={()=>{dispatch(getSong(item)); scrollToPLayer();}} className={classes.SongListCard} key={item.id}>
                <div className={classes.AlbumCover}>
                    <img src={item.albumCover} alt={`${item.artist}-${item.track}`} />
                </div>
                <div className={classes.TrackName}>
                    <h3>{item.track}</h3>
                    <p>{item.artist}</p>
                </div>
            </div>
        )
    });

    return (
        <div className={classes.SongListWrapper}>
            <div className={classes.SongList}>
                {songListRender}
            </div>
        </div>
    ) 
}