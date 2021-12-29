import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer, Wrapper } from '../../styles/Basic';
import ScreenNavigationHeader from '../ScreenNavigationHeader';

/* Services */
import GetCurrentlyPlayingTrackInfoService from '../../data/services/GetCurrentlyPlayingTrackInfoService';

/* Selectors */
import { getCachedTracks, getCurrentlyPlayingTrackInfo } from '../../data/reducers/spotifyAPISlice';
import { getBlacklistTracks, removeTrack } from '../../data/reducers/blacklistSlice';

/* Actions */
import { setCurrentlyPlayingTrackInfo } from '../../data/reducers/spotifyAPISlice';
import { addTrack } from '../../data/reducers/blacklistSlice';

/* Types */
import type { AppState } from '../../data/store';
import { getPlayerInstance } from '../../data/reducers/spotifyPlayerSDKSlice';


const BlacklistScreen = () => {
  const {
    cachedTracks,
    currentlyPlayingTrackInfo,
    blacklistTracks,
  } = useSelector((state: AppState) => ({
    cachedTracks: getCachedTracks(state),
    currentlyPlayingTrackInfo: getCurrentlyPlayingTrackInfo(state),
    blacklistTracks: getBlacklistTracks(state),
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    let timer : NodeJS.Timeout;
    const fetchTrack = async () => {
      const data = await GetCurrentlyPlayingTrackInfoService();
      dispatch(setCurrentlyPlayingTrackInfo(data));
      timer = setTimeout(fetchTrack, 1000);
    };
    fetchTrack();
    return () => clearTimeout(timer);
  }, []);

  const currentTrackText = currentlyPlayingTrackInfo?.item?.name ?? 'None';
  const blacklistTracksList = Array.from(blacklistTracks);

  return (
    <PageContainer justifyStartChildren>
      <ScreenNavigationHeader
        title='Blacklist'
      />
      <Wrapper
        justifyCenterChildren
        height='50%'
      >
        <div style={{
          textAlign: 'center',
        }}>
          Current track: {currentTrackText}
        </div>
        <Button
          onClick={() => {
            const item = currentlyPlayingTrackInfo?.item;
            item && dispatch(addTrack(item));
          }}
        >
          ADD
        </Button>
      </Wrapper>
      <Wrapper
        scroll
        height='50%'
      >
        {blacklistTracksList &&
        blacklistTracksList.length !== 0 &&
        blacklistTracksList.map((id) => {
          const track = cachedTracks[id];
          if (!track) { return null; }
          return (<div onClick={() => dispatch(removeTrack(track))} key={id}>
            {track.name}
          </div>);
        })}
      </Wrapper>
    </PageContainer>
  )
}

export default BlacklistScreen;
