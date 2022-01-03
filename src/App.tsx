import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

/* Screens */
import HomeScreen from './components/screens/HomeScreen';
import ListenLaterScreen from './components/screens/ListenLaterScreen';
import LoginSuccessScreen from './components/screens/LoginSuccessScreen';
import BlacklistScreen from './components/screens/BlacklistScreen';

/* Child Components */
import { OuterContainer } from './styles/Basic';
import PlayerControlBar from './components/PlayerControlBar';

/* Selectors */
import { getBlacklistTracks } from './data/reducers/blacklistSlice';
import { getDeviceID } from './data/reducers/spotifyPlayerSDKSlice';

/* Types */
import type { AppState } from './data/store';
import axios from 'axios';


const App = () => {
  const dispatch = useDispatch();

  const {
    blacklistTracks,
    deviceID,
  } = useSelector((state: AppState) => ({
    blacklistTracks: getBlacklistTracks(state),
    deviceID: getDeviceID(state),
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

  useEffect(() => {
    if (!deviceID) { return; }
    axios.post('/transfer-playback', null, {
      params: {
        deviceID,
      }
    }).then(resp => {
      console.log('successful transfer');
      console.log(resp);
    })
  }, [deviceID]);

  return (
    <OuterContainer>
      <div style={{flex: 1}}>
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
      </div>
      <PlayerControlBar spotifyPlayer={spotifyPlayer} />
    </OuterContainer>
  );
}

export default App;