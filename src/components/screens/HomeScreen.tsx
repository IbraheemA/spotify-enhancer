import React from 'react';
import { useNavigate } from 'react-router-dom';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer } from '../../styles/Basic';

const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div>Navigate to: </div>
      <div
        onClick={() => navigate('/listen-later')}
      >
          Listen Later
      </div>
    </PageContainer>
  )
}

export default HomeScreen;
