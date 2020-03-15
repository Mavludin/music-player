import React from 'react';
import classes from './MusicPlayer.module.css';
import ProgressBar from './components/ProgressBar/ProgressBar';

class MusicPlayer extends React.Component {

    state = {
        songDuration: '',
        prevSlideValue: 0,
        songMuted: false,
        slideValue: 100,
        songPlayed: false,
        progressWidth: 0,
        timerSeconds: '00',
        timerMinutes: '00',
        repeatAudio: false,
        shuffleFlag: false
    }

    audioPlayer = React.createRef();

    ////// From App

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

            if (parseInt(this.state.currentSong.id) === parseInt(this.props.songList.length) && !this.state.repeatAudio && !this.state.shuffleFlag) this.setState({currentSong: this.props.songList[0]});
            else if (!this.state.repeatAudio && !this.state.shuffleFlag) this.setState({currentSong: this.props.songList[this.state.currentSong.id], songPlayed: true});

            if (!this.state.repeatAudio && this.state.shuffleFlag) {
            const getNumber = Math.floor(Math.random() * Math.floor(this.props.songList.length));

            if (getNumber !== this.state.currentSong.id-1) {
                this.setState({currentSong: this.props.songList[getNumber], songPlayed: true});
            }

            }
            
        }

    }


    onPlayClick = () => {
        this.setState({songPlayed: true});
    }

    onPauseClick = () => {
        this.setState({songPlayed: false});
    }

    previousSong = () => {
        if (parseInt(this.state.currentSong.id) === 1) this.setState({currentSong: this.props.songList[this.props.songList.length-1]});
        else this.setState({currentSong: this.props.songList[this.state.currentSong.id-2], songPlayed: true});
    }
        
    nextSong = () => {
        if (parseInt(this.state.currentSong.id) === parseInt(this.props.songList.length) && !this.state.repeatAudio && !this.state.shuffleFlag) this.setState({currentSong: this.props.songList[0]});
        else if (!this.state.shuffleFlag) this.setState({currentSong: this.props.songList[this.state.currentSong.id], songPlayed: true});

        if (this.state.shuffleFlag) {

            const getNumber = Math.floor(Math.random() * Math.floor(this.props.songList.length));
            
            if (getNumber !== this.state.currentSong.id-1) {
            this.setState({currentSong: this.props.songList[getNumber], songPlayed: true});
            }
        }
    }

    letsShuffle = () => {
        this.setState({shuffleFlag: !this.state.shuffleFlag});
    }
    
    onRepeatAudio = () => {
        this.setState({repeatAudio: !this.state.repeatAudio});
    }

    ////// From App

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
        if (this.state.songPlayed) this.audioPlayer.current.play();
        else this.audioPlayer.current.pause();
    }

    render() {

        const repeatClasses = ['fas fa-sync-alt'];
        if (this.props.repeatAudio) repeatClasses.push(classes.repeatOn);
    
        const shuffleClasses = ['fas fa-random'];
        if (this.props.shuffleFlag) shuffleClasses.push(classes.shuffleOn);

        const unMuted = <i onClick={this.onMute} className="fas fa-volume-up"></i>;
        const muted = <i onClick={this.onUnMute} className="fas fa-volume-mute"></i>;

        const songPLayed = <i onClick={this.onPlayClick} className={["fas fa-play-circle", classes.PlayButton].join(' ')}></i>;
        const songPaused = <i onClick={this.onPauseClick} className={["fas fa-pause-circle", classes.PauseButton].join(' ')}></i>;

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
                    <i onClick={this.letsShuffle} className={shuffleClasses.join(' ')}></i>
                    <i onClick={this.previousSong} className={["fas fa-step-backward", classes.BackwardsIcon].join(' ')}></i>

                    { this.state.songPlayed ? songPaused : songPLayed }

                    <i onClick={this.nextSong} className={["fas fa-step-forward", classes.ForwardIcon].join(' ')}></i>
                    <i onClick={this.onRepeatAudio} className={repeatClasses.join(' ')}></i>

                </div>

                <div className={classes.VolumeControl}>

                    {(this.state.songMuted || this.state.slideValue === 0) ? muted : unMuted}

                    <input className={classes.Slider} onChange={(e)=>this.onVolumeControl(e)} type="range" min="0" max="100" value={this.state.slideValue} />
                </div>
            
            </div>
        )

    }

}

export default MusicPlayer;

