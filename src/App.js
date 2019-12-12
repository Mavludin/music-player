import React from 'react';
import './App.css';

import axios from 'axios';

import SongList from './Components/SongList/SongList';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';

import './Main.module.css';

class App extends React.Component {

  state = {
    currentSong : {},
    songList : [],
    songPlayed: false,
    progressWidth: 0,
    repeatAudio: false,
    shuffleFlag: false,
    timerSeconds: '00',
    timerMinutes: '00'
  }

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

      if (parseInt(this.state.currentSong.id) === parseInt(this.state.songList.length) && !this.state.repeatAudio && !this.state.shuffleFlag) this.setState({currentSong: this.state.songList[0]});
      else if (!this.state.repeatAudio && !this.state.shuffleFlag) this.setState({currentSong: this.state.songList[this.state.currentSong.id], songPlayed: true});

      if (!this.state.repeatAudio && this.state.shuffleFlag) {
        const getNumber = Math.floor(Math.random() * Math.floor(this.state.songList.length));

        if (getNumber !== this.state.currentSong.id-1) {
          this.setState({currentSong: this.state.songList[getNumber], songPlayed: true});
        }

      }
      
    }

  }

  onCardClick = (pos) => {
    this.setState({currentSong: this.state.songList[pos], songPlayed: true});
  }

  onPlayClick = () => {
    this.setState({songPlayed: true});
  }

  onPauseClick = () => {
    this.setState({songPlayed: false});
  }

  previousSong = () => {
    if (parseInt(this.state.currentSong.id) === 1) this.setState({currentSong: this.state.songList[this.state.songList.length-1]});
    else this.setState({currentSong: this.state.songList[this.state.currentSong.id-2], songPlayed: true});
  }

  nextSong = () => {
    if (parseInt(this.state.currentSong.id) === parseInt(this.state.songList.length) && !this.state.repeatAudio && !this.state.shuffleFlag) this.setState({currentSong: this.state.songList[0]});
    else if (!this.state.shuffleFlag) this.setState({currentSong: this.state.songList[this.state.currentSong.id], songPlayed: true});

    if (this.state.shuffleFlag) {

      const getNumber = Math.floor(Math.random() * Math.floor(this.state.songList.length));
      
      if (getNumber !== this.state.currentSong.id-1) {
        this.setState({currentSong: this.state.songList[getNumber], songPlayed: true});
      }
    }
  }

  onRepeatAudio = () => {
    this.setState({repeatAudio: !this.state.repeatAudio});
  }

  letsShuffle = () => {
    this.setState({shuffleFlag: !this.state.shuffleFlag});
  }

  componentDidMount() {
    axios.get('https://5dd1894f15bbc2001448d28e.mockapi.io/playlist')
    .then(response => {
      this.setState({songList: response.data, currentSong: response.data[0]});
    });
  }

  render() {

    return (
      <div className="App">
        <main>

          <MusicPlayer
            currentSong={this.state.currentSong}
            onHandleProgressBar={this.onHandleProgressBar}
            timerMinutes={this.state.timerMinutes}
            timerSeconds={this.state.timerSeconds}
            letsShuffle={this.letsShuffle}
            songPlayed={this.state.songPlayed}
            onPlayClick={this.onPlayClick}
            onPauseClick={this.onPauseClick}
            repeatAudio={this.state.repeatAudio}
            shuffleFlag={this.state.shuffleFlag}
            progressWidth={this.state.progressWidth}
            previousSong={this.previousSong}
            nextSong={this.nextSong}
            onRepeatAudio={this.onRepeatAudio}
          />

          <SongList onCardClick={this.onCardClick} songList={this.state.songList} />

        </main>
      </div>
    );
  }

}

export default App;
