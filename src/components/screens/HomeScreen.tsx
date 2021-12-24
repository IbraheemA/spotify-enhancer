import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Child Components */
import Button from '../../styles/Button';
import { PageContainer } from '../../styles/Basic';

/* Utils */
import login from '../../utils/login';

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
      <div
        onClick={() => navigate('/blacklist')}
      >
          Blacklist
      </div>
      <a href='http://localhost:8080/login'>Login</a>
      {/* <a href='http://localhost:3000/auth/spotify'>Login</a> */}
      {/* <div
        onClick={() => login()}
      >
          Login
      </div> */}
    </PageContainer>
  )
}

export default HomeScreen;
