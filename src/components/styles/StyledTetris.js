import styled from 'styled-components';

import bgImage from '../../img/bg.jpg';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
  align-items: center;
  justify-content: center;
  aside {
    width: 100%;
    max-width: 12.5em;
    display: block;
    padding: 0 20px;
    
  }

  @media (max-width:500px){
      flex-direction:column-reverse;
  }

`;



export const StyledMusBtn = styled.button`
  
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
  align-items: center;
  justify-content: center;
`;
