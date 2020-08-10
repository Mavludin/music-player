import React, { useEffect } from 'react';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { loadData } from './store/Actions';

import { Preloader } from './components/Preloader/Preloader';
import { SongList } from './components/SongList/SongList';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';

const App = () => {

  const songList = useSelector(state => state.data)
  const dispatch = useDispatch();

  const musicPlayer = React.createRef();

  useEffect(() => {
    dispatch(loadData())
  }, [dispatch])

  return (
    <div className="App">
      <Preloader visible={songList === null}>
        <main>
          <MusicPlayer musicPlayer={musicPlayer} songList={songList} />
          <SongList musicPlayer={musicPlayer} songList={songList} />
        </main>
      </Preloader>
    </div>
  );
}

export default App
