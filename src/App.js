import React from 'react';
import './App.css';

import SongList from './Components/SongList/SongList';
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';

import './Main.module.css';

import { connect } from 'react-redux';
import { loadData } from './Store/Actions';

import Preloader from './Components/Preloader/Preloader';

class App extends React.Component {

  state = {
    currentSong : {}
  }

  onCardClick = (pos) => {
    this.setState({currentSong: this.props.songList[pos], songPlayed: true});
  }

  componentDidMount() {
    this.props.getDataFromBackEnd();
  }

  render() {

    return (

      <div className="App">
       <Preloader visible={!this.props.songList.length}>
          <main>

            {
              this.props.songList.length !== undefined
              ?
                <MusicPlayer currentSong={this.props.songList[0]} />
              : null
            }

          {
            this.props.songList.length !== undefined
            ?
              <SongList onCardClick={this.onCardClick} songList={this.props.songList} />
            : null
          }

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
