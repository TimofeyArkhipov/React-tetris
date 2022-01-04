import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  margin: 0 0 1em 0;
  padding: 1em;
  border: 4px solid #d5247c;
  min-height: 1em;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  text-transform: uppercase;
`;