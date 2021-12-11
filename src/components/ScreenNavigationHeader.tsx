import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircleSharp } from 'react-icons/io5';

/* Child Components */
import Button from '../styles/Button';
import { Row } from '../styles/Basic';

const ScreenNavigationHeader = () => {
  const navigate = useNavigate();
  return (
    <Row
      style={{
        padding: 20,
        borderBottom: '1px solid white',
      }}
    >
      <div
        onClick={() => navigate(-1)}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IoChevronBackCircleSharp
          color='white'
          size={20}
          style={{
            verticalAlign: 'text-bottom',
            marginRight: 5,
          }}
        />
        <span style={{
          fontFamily: 'Montserrat',
          color: 'white',
        }}>Go Back</span>
      </div>
    </Row>
  )
}

export default ScreenNavigationHeader;
