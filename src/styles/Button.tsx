import styled from 'styled-components';

export default styled.button`
  &:hover {
    outline-width: 5px;
    outline-offset: -3px;
  }
  &:active {
    outline-width: 0px;
  }
  font-family: Montserrat;
  font-weight: bold;
  color: white;
  padding: 10px;
  background-color: #1DB954;
  border-radius: 40px;
  border: 0px;
  outline-width: 0px;
  outline-style: solid;
  outline-color: #1DB954;
`;
