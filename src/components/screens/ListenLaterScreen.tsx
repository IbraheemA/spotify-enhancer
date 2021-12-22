import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer, Wrapper } from '../../styles/Basic';
import ScreenNavigationHeader from '../ScreenNavigationHeader';

/* Services */
import GetCurrentlyPlayingTrackService from '../../data/services/GetCurrentlyPlayingTrackService';

/* Selectors */
import { getCurrentlyPlayingTrack } from '../../data/reducers/spotifyAPISlice';
import { getListenLaterTracks } from '../../data/reducers/listenLaterSlice';

/* Actions */
import { setCurrentlyPlayingTrack } from '../../data/reducers/spotifyAPISlice';
import { addTrack } from '../../data/reducers/listenLaterSlice';

/* Types */
import type { AppState } from '../../data/store';


const ListenLaterScreen = () => {
  const {
    currentlyPlayingTrack,
    listenLaterTracks,
  } = useSelector((state: AppState) => ({
    currentlyPlayingTrack: getCurrentlyPlayingTrack(state),
    listenLaterTracks: getListenLaterTracks(state),
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    let timer : NodeJS.Timeout;
    const fetchTrack = async () => {
      const data = await GetCurrentlyPlayingTrackService();
      dispatch(setCurrentlyPlayingTrack(data));
      timer = setTimeout(fetchTrack, 1000);
    };
    fetchTrack();
    return () => clearTimeout(timer);
  }, []);

  const currentTrackText = currentlyPlayingTrack?.item?.name ?? 'None';

  return (
    <PageContainer justifyStartChildren>
      <ScreenNavigationHeader />
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
          onClick={() => {currentlyPlayingTrack && dispatch(addTrack(currentlyPlayingTrack?.item))}}
        >
          ADD
        </Button>
      </Wrapper>
      <Wrapper
        scroll
        height='50%'
      >
        {listenLaterTracks && listenLaterTracks.length !== 0 && listenLaterTracks.map((track) => (<div>
          {track.name}
        </div>))}
      </Wrapper>
    </PageContainer>
  )
}

export default ListenLaterScreen;
