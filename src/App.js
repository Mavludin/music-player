import React, { useEffect } from 'react';
import './App.css';

import SongList from './сomponents/SongList/SongList';
import MusicPlayer from './сomponents/MusicPlayer/MusicPlayer';

import { connect } from 'react-redux';
import { loadData } from './store/Actions';

import Preloader from './сomponents/Preloader/Preloader';

// import toTopIcon from './img/to-top.svg';

// import Scroll from 'react-scroll';

const App = (props) => {

  const musicPlayer = React.createRef();

  useEffect(() => {

    props.getDataFromBackEnd();

    // window.addEventListener('scroll', ()=>{
    //   if (window.scrollY > 0) {
    //     document.querySelector('.toTopIcon').style.display = 'block';
    //   } else {
    //     document.querySelector('.toTopIcon').style.display = 'none';
    //   }
    // });

  })

  // const backToTop = () => {
  //   Scroll.animateScroll.scrollToTop();
  // }

  return (
    <div className="App">
      <Preloader visible={!props.songList.length}>
        <main>
          <MusicPlayer musicPlayer={musicPlayer} songList={props.songList} />
          <SongList musicPlayer={musicPlayer} songList={props.songList} />
          {/* <img 
                onClick={this.backToTop} 
                className="toTopIcon" 
                src={toTopIcon} 
                alt="to Top Icon"
              /> */}
        </main>
      </Preloader>
    </div>
  );
}

const setStateInProps = (state) => {
  return {
    songList: state.data
  }
}

const setActionsInProps = (dispatch) => {
  return {
    getDataFromBackEnd: () => { dispatch(loadData()) }
  }
}

export default connect(setStateInProps, setActionsInProps)(App);
