import styled from 'styled-components';
import { mainPurple } from '../../Constants';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${mainPurple};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopMenu = styled.div``;

const StatementSheet = styled.div``;

const BottomMenu = styled.div``;

function Statement() {
  return (
    <Container>
      <TopMenu></TopMenu>
      <StatementSheet></StatementSheet>
      <BottomMenu></BottomMenu>
    </Container>
  );
}

export default Statement;
