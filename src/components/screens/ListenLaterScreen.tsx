import React from 'react';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer, Wrapper } from '../../styles/Basic';
import ScreenNavigationHeader from '../ScreenNavigationHeader';

const ListenLaterScreen = () => {
  return (
    <PageContainer>
      <ScreenNavigationHeader />
      <Wrapper>
        <div style={{ textAlign: 'center' }}>
          Current track:
        </div>
        <Button>ADD</Button>
      </Wrapper>
    </PageContainer>
  )
}

export default ListenLaterScreen;
