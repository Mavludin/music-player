import React from 'react';
import classes from './MusicPlayer.module.css';
import ProgressBar from './components/ProgressBar/ProgressBar';

import { connect } from 'react-redux';
import { playSong, pauseSong, getSong } from '../../Store/Actions';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import LoopIcon from '@material-ui/icons/Loop';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

class MusicPlayer extends React.Component {

    state = {
        songDuration: '',
        prevSlideValue: 0,
        songMuted: false,
        slideValue: 100,
        progressWidth: 0,
        timerSeconds: '00',
        timerMinutes: '00',
        repeatFlag: false,
        shuffleFlag: false
    }

    audioPlayer = React.createRef();

    onHandleProgressBar = (e) => {

        this.setState({progressWidth: e.target.currentTime / e.target.duration});

        let mins = Math.floor(e.target.currentTime / 60);
        let secs = Math.floor(e.target.currentTime % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }

        if (mins < 10) {
            mins = '0' + String(mins);
        }

        this.setState({timerSeconds: secs, timerMinutes: mins});

        if (this.state.progressWidth === 1) {

            if (parseInt(this.props.currentSong.id) === parseInt(this.props.songList.length) && !this.state.repeatFlag && !this.state.shuffleFlag) this.props.playNextSong(this.props.songList[0]);
            else if (!this.state.repeatFlag && !this.state.shuffleFlag) {
                this.props.playNextSong(this.props.songList[1]);
            }

            if (!this.state.repeatFlag && this.state.shuffleFlag) {
                
                const getNumber = Math.floor(Math.random() * Math.floor(this.props.songList.length));

                if (getNumber !== this.props.currentSong.id-1) {
                    this.props.playNextSong(this.props.songList[getNumber])
                }

            }
            
        }

    }

    previousSong = () => {
        if (parseInt(this.props.currentSong.id) === 1) this.props.playNextSong(this.props.songList[this.props.songList.length-1]);
        else {
            this.props.playNextSong(this.props.songList[this.props.currentSong.id-2]);
        }
    }
        
    nextSong = () => {
        if (parseInt(this.props.currentSong.id) === parseInt(this.props.songList.length) && !this.state.repeatFlag && !this.state.shuffleFlag) this.props.playNextSong(this.props.songList[0]);
        else if (!this.state.shuffleFlag) {
            this.props.playNextSong(this.props.songList[this.props.currentSong.id]);
        }

        if (this.state.shuffleFlag) {

            const getNumber = Math.floor(Math.random() * Math.floor(this.props.songList.length));
            
            if (getNumber !== this.props.currentSong.id-1) {
                this.props.playNextSong(this.props.songList[getNumber]);
            }
        }
    }

    letsShuffle = () => {
        this.setState({shuffleFlag: !this.state.shuffleFlag});
    }
    
    onrepeatFlag = () => {
        this.setState({repeatFlag: !this.state.repeatFlag});
    }

    onVolumeControl = (e) => {
        this.audioPlayer.current.volume = e.target.value/100;
        this.setState({slideValue: e.target.value});

        if (Number(e.target.value) === 0) this.setState({songMuted: true})
            else this.setState({songMuted: false})
    }

    onLoadedMetadata = (e) => {
        let minutes = Math.floor(e.target.duration / 60);
        let seconds = e.target.duration - minutes * 60;
    
        if (minutes<9) minutes = "0"+minutes;
        if (seconds<9) seconds = "0"+seconds;
        const totalTime = `${minutes}:${seconds}`;
        this.setState({songDuration: totalTime.slice(0,5)});
    }

    onMute = () => {
        this.setState({prevSlideValue: this.state.slideValue});
        this.setState({songMuted: true, slideValue: 0});
        this.audioPlayer.current.volume = 0;
    }
    
    onUnMute = () => {
        this.audioPlayer.current.volume = this.state.prevSlideValue/100;
        this.setState({songMuted: false, slideValue: this.state.prevSlideValue});
    }

    componentDidUpdate() {
        if (this.props.songPlayed) this.audioPlayer.current.play();
        else this.audioPlayer.current.pause();
    }

    render() {

        const unMuted = <VolumeUpIcon onClick={this.onMute} />
        const muted = <VolumeOffIcon onClick={this.onUnMute} />
        const playSongIcon = <PlayCircleFilledIcon className={classes.PlayButton} onClick={()=>this.props.playSong()} />
        const pauseSongIcon = <PauseCircleFilledIcon className={classes.PauseButton} onClick={()=>this.props.pauseSong()} />

        return (
            <div className={classes.MusicPlayer}>

                <img src={this.props.currentSong.albumCover} alt="Album cover"/>
                <h2>{`${this.props.currentSong.artist} - ${this.props.currentSong.track}`}</h2>

                <audio 
                    onLoadedMetadata={(e)=>this.onLoadedMetadata(e)} 
                    onTimeUpdate={(e)=>this.onHandleProgressBar(e)} 
                    src={this.props.currentSong.file} ref={this.audioPlayer}
                >
                </audio>

                <ProgressBar
                    timerMinutes={this.state.timerMinutes}
                    timerSeconds={this.state.timerSeconds}
                    songDuration={this.state.songDuration}
                    progressWidth={this.state.progressWidth}
                />
                
                <div className={classes.AudioControls}>
                    <ShuffleIcon onClick={this.letsShuffle} className={this.state.shuffleFlag ? classes.ShuffleOn : null} />
                    <SkipPreviousIcon onClick={this.previousSong} className={classes.BackwardsIcon} />
                    { this.props.songPlayed ? pauseSongIcon : playSongIcon }
                    <SkipNextIcon onClick={this.nextSong} className={classes.ForwardIcon} />
                    <LoopIcon onClick={this.onrepeatFlag} className={this.state.repeatFlag ? classes.RepeatOn : null} />
                </div>

                <div className={classes.VolumeControl}>
                    {(this.state.songMuted || this.state.slideValue === 0) ? muted : unMuted}
                    <input className={classes.Slider} onChange={(e)=>this.onVolumeControl(e)} type="range" min="0" max="100" value={this.state.slideValue} />
                </div>
            
            </div>
        )

    }

}

const setStateInProps = (state) => {
    return {
      currentSong: state.currentSong,
      songPlayed: state.songPlayed,
    }
}

const setActionsInProps = (dispatch) => {
    return {
      playSong: () => {dispatch(playSong())},
      pauseSong: () => {dispatch(pauseSong())},
      playNextSong: (obj) => {dispatch(getSong(obj))}
    }
  }
  

export default connect (setStateInProps, setActionsInProps)(MusicPlayer);

