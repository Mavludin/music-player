import React from 'react';
import classes from './AudioControls.module.css';

import { useDispatch } from 'react-redux';
import { getSong } from '../../../../Store/Actions';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import LoopIcon from '@material-ui/icons/Loop';
import ShuffleIcon from '@material-ui/icons/Shuffle';

const AudioControls = ( 
    {
        shuffleFlag, 
        letsShuffle, 
        onRepeatFlag, 
        repeatFlag,
        songList,
        currentSong,
        songPlayed,
        playSong,
        pauseSong
    }
) => {

    const playNextSong = useDispatch();

    const previousSong = () => {
        if (parseInt(currentSong.id) === 1) playNextSong(getSong(songList[songList.length-1]));
        else {
            playNextSong(getSong(songList[currentSong.id-2]));
        }
    }

    const nextSong = () => {
        if (parseInt(currentSong.id) === parseInt(songList.length) && !repeatFlag && !shuffleFlag) playNextSong(getSong(songList[0]));
        else if (!shuffleFlag) {
            playNextSong(getSong(songList[currentSong.id]));
        }

        if (shuffleFlag) {

            const getNumber = Math.floor(Math.random() * Math.floor(songList.length));
            
            if (getNumber !== currentSong.id-1) {
                playNextSong(getSong(songList[getNumber]));
            }
        }
    }

    const playSongIcon = <PlayCircleFilledIcon className={classes.PlayButton} onClick={playSong} />
    const pauseSongIcon = <PauseCircleFilledIcon className={classes.PauseButton} onClick={pauseSong} />

    return (
        <div className={classes.AudioControls}>
            <ShuffleIcon onClick={letsShuffle} className={shuffleFlag ? classes.ShuffleOn : null} />
            <SkipPreviousIcon onClick={previousSong} className={classes.BackwardsIcon} />
            { songPlayed ? pauseSongIcon : playSongIcon }
            <SkipNextIcon onClick={nextSong} className={classes.ForwardIcon} />
            <LoopIcon onClick={onRepeatFlag} className={repeatFlag ? classes.RepeatOn : null} />
        </div>
    )

}

export default AudioControls;