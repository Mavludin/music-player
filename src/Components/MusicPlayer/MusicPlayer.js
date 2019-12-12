import React from 'react';

import classes from './MusicPlayer.module.css';

class MusicPlayer extends React.Component {

    state = {
        songDuration: '',
        prevSlideValue: 0,
        songMuted: false,
        slideValue: 100
    }

    onVolumeControl = (e) => {
        this.refs.audioPlayer.volume = e.target.value/100;
        this.setState({slideValue: e.target.value});
    }

    onLoadedMetadata = (e) => {
        let minutes = Math.floor(e.target.duration / 60);
        let seconds = e.target.duration - minutes * 60;
    
        if (minutes<9) minutes = "0"+minutes;
        if (seconds<9) seconds = "0"+seconds;
        const totalTime = `${minutes}:${seconds}`;
        this.setState({songDuration: totalTime.slice(0,5)});
    }

    OnProgressClick = (e) => {
        let percent = e.nativeEvent.offsetX/e.target.offsetWidth;
        const audio = this.refs.audioPlayer;
        audio.currentTime = percent*audio.duration;
        const progress = document.querySelector('progress');
        progress.value = percent;
    }

    onMute = () => {
        this.setState({prevSlideValue: this.state.slideValue});
        this.setState({songMuted: true, slideValue: 0});
        this.refs.audioPlayer.volume = 0;
    }
    
    onUnMute = () => {
        this.refs.audioPlayer.volume = this.state.prevSlideValue/100;
        this.setState({songMuted: false, slideValue: this.state.prevSlideValue});
    }

    componentDidUpdate() {
        if (this.props.songPlayed) this.refs.audioPlayer.play();
        else this.refs.audioPlayer.pause();
    }

    render() {

        const repeatClasses = ['fas fa-sync-alt'];
        if (this.props.repeatAudio) repeatClasses.push(classes.repeatOn);
    
        const shuffleClasses = ['fas fa-random'];
        if (this.props.shuffleFlag) shuffleClasses.push(classes.shuffleOn);

        const unMuted = <i onClick={this.onMute} className="fas fa-volume-up"></i>;
        const muted = <i onClick={this.onUnMute} className="fas fa-volume-mute"></i>;

        const songPLayed = <i onClick={this.props.onPlayClick} className={["fas fa-play-circle", classes.PlayButton].join(' ')}></i>;
        const songPaused = <i onClick={this.props.onPauseClick} className={["fas fa-pause-circle", classes.PauseButton].join(' ')}></i>;

        return (
            <div className={classes.MusicPlayer}>

                <img src={this.props.currentSong.albumCover} alt="Album cover"/>
                <h2>{`${this.props.currentSong.artist} - ${this.props.currentSong.track}`}</h2>

                <audio 
                    onLoadedMetadata={(e)=>this.onLoadedMetadata(e)} 
                    onTimeUpdate={(e)=>this.props.onHandleProgressBar(e)} 
                    src={this.props.currentSong.file} ref='audioPlayer'>
                </audio>

                <div className={classes.progressBox}>
                <h3>{this.props.timerMinutes}:{this.props.timerSeconds}</h3>
                <progress onClick={(e)=>this.OnProgressClick(e)} value={this.props.progressWidth.toString()} max="1"></progress>
                <h3>{this.state.songDuration}</h3>
                </div>
                
                <div className={classes.AudioControls}>
                <i onClick={this.props.letsShuffle} className={shuffleClasses.join(' ')}></i>
                <i onClick={this.props.previousSong} className={["fas fa-step-backward", classes.BackwardsIcon].join(' ')}></i>

                { this.props.songPlayed ? songPaused : songPLayed }

                <i onClick={this.props.nextSong} className={["fas fa-step-forward", classes.ForwardIcon].join(' ')}></i>
                <i onClick={this.props.onRepeatAudio} className={repeatClasses.join(' ')}></i>

                </div>

                <div className={classes.VolumeControl}>

                {(this.state.songMuted || this.state.slideValue == 0) ? muted : unMuted}

                <input ref="inputRange" className={classes.Slider} onChange={(e)=>this.onVolumeControl(e)} type="range" min="0" max="100" value={this.state.slideValue} />
                </div>
            
            </div>
        )

    }

}

export default MusicPlayer;

