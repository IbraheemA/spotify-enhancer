import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer } from '../../styles/Basic';

/* Selectors */
import { setDeviceID, setInstance } from '../../data/reducers/spotifyPlayerSDKSlice';
import { getBlacklistTracks } from '../../data/reducers/blacklistSlice';

/* Actions */
import { setPlaybackState } from '../../data/reducers/spotifyPlayerSDKSlice';

/* Types */
import type { AppState } from '../../data/store';
import { logStateChange } from '../../utils/spotifyPlayerListeners';

type PropsType = {
  setSpotifyPlayer: (p: Spotify.Player) => void,
};

const LoginSuccessScreen = ({
  setSpotifyPlayer,
}: PropsType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const {
    blacklistTracks,
  } = useSelector((state: AppState) => ({
    blacklistTracks: getBlacklistTracks(state),
  }));

  useEffect(() => {
    const createPlayer = async () => {
      let spotifyPlayer: Spotify.Player;
      let checkPlayerInterval : NodeJS.Timeout | null = null;

      const checkIsPlayerReady = () => {
        if (window.Spotify != null) {
          const { accessToken } = params;
          if (accessToken == null) {
            checkPlayerInterval && clearInterval(checkPlayerInterval);
            throw new Error("No access token");
          }
          spotifyPlayer = new window.Spotify.Player({
            name: "Spotify Enhancer",
            getOAuthToken: cb => { cb(accessToken) },
          });

          spotifyPlayer.addListener('ready',
            (data: Spotify.WebPlaybackInstance) => {
              const { device_id } = data;
              console.log(`Device is ready! ID: ${device_id}`);
              dispatch(setDeviceID(device_id));

              spotifyPlayer.addListener('player_state_changed',
                (state: Spotify.PlaybackState) => {
                  state && setPlaybackState(state);
                }
              );
              
              // spotifyPlayer.addListener('player_state_changed',
              //   logStateChange);
            }
          );

          spotifyPlayer.connect();
          setSpotifyPlayer(spotifyPlayer);

          checkPlayerInterval && clearInterval(checkPlayerInterval);

          navigate('/');
        }
      };
  
      checkPlayerInterval = setInterval(() => checkIsPlayerReady(), 1000);
    };
    createPlayer();
  }, []);

  return (
    <PageContainer>
      <div>Login successful! Redirecting... </div>
    </PageContainer>
  )
}

export default LoginSuccessScreen;
