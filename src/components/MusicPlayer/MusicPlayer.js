import React, { useState, useEffect } from 'react';
import classes from './MusicPlayer.module.css';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { AudioControls } from './components/AudioControls/AudioControls'

import { useSelector, useDispatch } from 'react-redux';
import { getSong } from '../../store/Actions';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

export const MusicPlayer = ({ songList, musicPlayer }) => {

    const currentSong = useSelector(state => state.currentSong);
    const songPlayed = useSelector(state => state.songPlayed);

    const playNextSong = useDispatch(getSong);

    const [songDuration, setSongDuration] = useState('');
    const [prevSlideValue, setPrevSlideValue] = useState(0);
    const [songMuted, muteSong] = useState(false);
    const [slideValue, setSlideValue] = useState(100);
    const [progressWidth, setProgressWidth] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [isGonnaRepeat, repeatSong] = useState(false);
    const [isShuffled, shuffleSongs] = useState(false);

    const audioPlayer = React.createRef();

    const onHandleProgressBar = (e) => {

        setProgressWidth(e.target.currentTime / e.target.duration);

        let mins = Math.floor(e.target.currentTime / 60);
        let secs = Math.floor(e.target.currentTime % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }

        if (mins < 10) {
            mins = '0' + String(mins);
        }

        setTimerSeconds(secs);
        setTimerMinutes(mins);

        if (progressWidth === 1) {

            if (parseInt(currentSong.id) === parseInt(songList.length) && !isGonnaRepeat && !isShuffled) playNextSong(songList[0]);
            else if (!isGonnaRepeat && !isShuffled) {
                playNextSong(songList[1]);
            }

            if (!isGonnaRepeat && isShuffled) {

                const getNumber = Math.floor(Math.random() * Math.floor(songList.length));

                if (getNumber !== currentSong.id - 1) {
                    playNextSong(songList[getNumber])
                }

            }

        }

    }

    const letsShuffle = () => {
        shuffleSongs(!isShuffled);
    }

    const onRepeatSong = () => {
        repeatSong(!isGonnaRepeat);
    }

    const onVolumeControl = (e) => {
        audioPlayer.current.volume = e.target.value / 100;
        setSlideValue(e.target.value);

        if (Number(e.target.value) === 0) muteSong(true)
        else muteSong(false)
    }

    const onLoadedMetadata = (e) => {
        let minutes = Math.floor(e.target.duration / 60);
        let seconds = e.target.duration - minutes * 60;

        if (minutes < 9) minutes = "0" + minutes;
        if (seconds < 9) seconds = "0" + seconds;
        const totalTime = `${minutes}:${seconds}`;
        setSongDuration(totalTime.slice(0, 5));
    }

    const onMute = () => {
        setPrevSlideValue(slideValue);
        muteSong(true);
        setSlideValue(0);
        audioPlayer.current.volume = 0;
    }

    const onUnMute = () => {
        audioPlayer.current.volume = prevSlideValue / 100;
        muteSong(false);
        setSlideValue(prevSlideValue);
    }

    useEffect(() => {
        if (songPlayed) audioPlayer.current.play();
        else audioPlayer.current.pause();
    })

    const unMuted = <VolumeUpIcon onClick={onMute} />
    const muted = <VolumeOffIcon onClick={onUnMute} />

    return (
        <div ref={musicPlayer} className={classes.MusicPlayer}>

            <img src={currentSong.albumCover} alt="Album cover" />
            <h1>{`${currentSong.artist} - ${currentSong.track}`}</h1>

            <audio
                onLoadedMetadata={(e) => onLoadedMetadata(e)}
                onTimeUpdate={(e) => onHandleProgressBar(e)}
                src={currentSong.file} ref={audioPlayer}
            >
            </audio>

            <ProgressBar
                timerMinutes={timerMinutes}
                timerSeconds={timerSeconds}
                songDuration={songDuration}
                progressWidth={progressWidth}
            />

            <AudioControls
                isShuffled={isShuffled}
                letsShuffle={letsShuffle}
                songPlayed={songPlayed}
                isGonnaRepeat={isGonnaRepeat}
                onRepeatSong={onRepeatSong}
                songList={songList}
                currentSong={currentSong}
            />

            <div className={classes.VolumeControl}>
                {(songMuted || slideValue === 0) ? muted : unMuted}
                <input className={classes.Slider} onChange={(e) => onVolumeControl(e)} type="range" min="0" max="100" value={slideValue} />
            </div>

        </div>
    )

}