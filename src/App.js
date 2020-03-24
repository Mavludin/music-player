import React from 'react';
import './App.css';

import SongList from './сomponents/SongList/SongList';
import MusicPlayer from './сomponents/MusicPlayer/MusicPlayer';

import { connect } from 'react-redux';
import { loadData } from './store/Actions';

import Preloader from './сomponents/Preloader/Preloader';

import toTopIcon from './img/to-top.svg';

import Scroll from 'react-scroll';

class App extends React.Component {

  componentDidMount() {
    this.props.getDataFromBackEnd();

    window.addEventListener('scroll', ()=>{
      if (window.scrollY > 0) {
        document.querySelector('.toTopIcon').style.display = 'block';
      } else {
        document.querySelector('.toTopIcon').style.display = 'none';
      }
    });
  }

  backToTop = () => {
    Scroll.animateScroll.scrollToTop();
  }

  render() {

    return (
      <div className="App">
       <Preloader visible={!this.props.songList.length}>
          <main>
              <MusicPlayer songList={this.props.songList} />
              <SongList songList={this.props.songList} />
              <img onScroll={(e)=>console.log(e)} onClick={this.backToTop} className="toTopIcon" src={toTopIcon} alt="to Top Icon"/>
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
