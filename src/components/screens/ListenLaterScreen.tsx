import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer, Wrapper } from '../../styles/Basic';
import ScreenNavigationHeader from '../ScreenNavigationHeader';

/* Types */
import type {
  GetCurrentlyPlayingTrackServiceType
} from '../../data/types/SpotifyAPITypes';

const ListenLaterScreen = () => {
  const [currentTrack, setCurrentTrack]
    = useState<GetCurrentlyPlayingTrackServiceType>();

  useEffect(() => {
    axios.get('/currently-playing').then((resp) => {
      const data : GetCurrentlyPlayingTrackServiceType = resp?.data;
      console.log("got response:");
      console.log(data);
      setCurrentTrack(data);
    });
  });

  return (
    <PageContainer>
      <ScreenNavigationHeader />
      <Wrapper>
        <div style={{ textAlign: 'center' }}>
          Current track: {currentTrack?.item?.name}
        </div>
        <Button
          // onClick={() => addTrack()}
        >ADD</Button>
      </Wrapper>
    </PageContainer>
  )
}

export default ListenLaterScreen;
