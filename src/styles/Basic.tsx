import styled from 'styled-components';

import { SimpleScrollbar } from './Mixins';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
  background-color: #222326;
  font-family: Montserrat;
  color: white;
  overflow: auto;
`;

export const PageContainer = styled.div<{
  justifyStartChildren?: boolean;
}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  ${(props) => props. justifyStartChildren && 'justify-content: flex-start'};
  width: 100%;
  overflow: auto;
`;

export const Wrapper = styled.div<{
  justifyCenterChildren?: boolean;
  height?: string;
  scroll?: boolean;
}>`
  display: flex;
  ${(props) => `flex-basis: ${props.height}` || 'flex: 1'};
  flex-direction: column;
  justify-content: ${(props) => props.justifyCenterChildren ? 'center' : 'flex-start'};
  align-items: center;
  ${(props) => props.scroll && `
    overflow: hidden;
    &:hover {
      overflow-y: overlay;
      // Subtract scrollbar width
      /* margin-right: -10px; */
    }
    ${SimpleScrollbar}
  `};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
