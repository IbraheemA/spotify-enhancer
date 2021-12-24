import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import BlacklistScreen from './components/screens/BlacklistScreen';

/* Screens */
import HomeScreen from './components/screens/HomeScreen';
import ListenLaterScreen from './components/screens/ListenLaterScreen';
import LoginSuccessScreen from './components/screens/LoginSuccessScreen';

/* Child Components */
import { OuterContainer } from './styles/Basic';

/* Selectors */
import { getBlacklistTracks } from './data/reducers/blacklistSlice';

/* Types */
import type { AppState } from './data/store';


const App = () => {
  const dispatch = useDispatch();

  const {
    blacklistTracks,
  } = useSelector((state: AppState) => ({
    blacklistTracks: getBlacklistTracks(state),
  }));
  const blacklistTracksRef = useRef<Array<string>>([]);

  const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player>();
  const [skipIssued, setSkipIssued] = useState<boolean>(false);

  const skipBlacklistTracks = (state: Spotify.PlaybackState) => {
    const id = state?.track_window?.current_track?.id;
    const tracks = blacklistTracksRef.current;
    if (id && tracks.includes(id)) {
      setSkipIssued(true);
    }
  };
  
  useEffect(() => {
    if (skipIssued) {
      spotifyPlayer?.nextTrack().then(() => {
        setSkipIssued(false);
      }).catch(err =>
        console.error(err)
      );
    }
  }, [skipIssued])

  const [blacklistListenerAdded, setBlacklistListenerAdded]
    = useState<boolean>(false);
  useEffect(() => {
    if (!blacklistListenerAdded && spotifyPlayer) {
      spotifyPlayer.addListener('player_state_changed',
        skipBlacklistTracks
      );
      setBlacklistListenerAdded(true);
    }
  }, [spotifyPlayer, blacklistListenerAdded]);

  useEffect(() => {
    blacklistTracksRef.current = blacklistTracks;
  }, [blacklistTracks]);

  return (
    <OuterContainer>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login-successful/:accessToken" element={
            <LoginSuccessScreen setSpotifyPlayer={setSpotifyPlayer}/>}
          />
          <Route path="/listen-later" element={<ListenLaterScreen />} />
          <Route path="/blacklist" element={<BlacklistScreen/>} />
        </Routes>
      </Router>
    </OuterContainer>
  );
}

export default App;