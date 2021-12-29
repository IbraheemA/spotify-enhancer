import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer, Wrapper } from '../../styles/Basic';
import ScreenNavigationHeader from '../ScreenNavigationHeader';

/* Services */
import GetCurrentlyPlayingTrackInfoService from '../../data/services/GetCurrentlyPlayingTrackInfoService';

/* Selectors */
import { getCurrentlyPlayingTrackInfo } from '../../data/reducers/spotifyAPISlice';
import { getListenLaterTracks } from '../../data/reducers/listenLaterSlice';

/* Actions */
import { setCurrentlyPlayingTrackInfo } from '../../data/reducers/spotifyAPISlice';
import { addTrack } from '../../data/reducers/listenLaterSlice';

/* Types */
import type { AppState } from '../../data/store';


const ListenLaterScreen = () => {
  const {
    currentlyPlayingTrackInfo,
    listenLaterTracks,
  } = useSelector((state: AppState) => ({
    currentlyPlayingTrackInfo: getCurrentlyPlayingTrackInfo(state),
    listenLaterTracks: getListenLaterTracks(state),
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

  return (
    <PageContainer justifyStartChildren>
      <ScreenNavigationHeader
        title='Listen Later'
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
          onClick={() => {currentlyPlayingTrackInfo && dispatch(addTrack(currentlyPlayingTrackInfo?.item))}}
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
