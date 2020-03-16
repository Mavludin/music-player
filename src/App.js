import React from 'react';
import './App.css';

import SongList from './Components/SongList/SongList';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';

import './Main.module.css';

import { connect } from 'react-redux';
import { loadData } from './Store/Actions';

import Preloader from './Components/Preloader/Preloader';

class App extends React.Component {

  onCardClick = (pos) => {
    this.setState({currentSong: this.props.songList[pos]});
  }

  componentDidMount() {
    this.props.getDataFromBackEnd();
  }

  componentDidUpdate() {
    console.log('App update')
  }

  render() {

    return (
      <div className="App">
       <Preloader visible={!this.props.songList.length}>
          <main>
              <MusicPlayer />
              <SongList onCardClick={this.onCardClick} songList={this.props.songList} />
          </main>
        </Preloader>
      </div>
    );
  }

}

const setStateInProps = (state) => {
  return {
    songList: state.data
  }
}

const setActionsInProps = (dispatch) => {
  return {
    getDataFromBackEnd: () => {dispatch(loadData())}
  }
}

export default connect(setStateInProps, setActionsInProps)(App);
