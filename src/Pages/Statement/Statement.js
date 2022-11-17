import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainPurple } from '../../Constants';
import LoadingPage from '../LoadingPage';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${mainPurple};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopMenu = styled.div`
  display: flex;
  width: 100%;
  max-width: 326px;
  align-items: center;
  justify-content: space-between;
`;

const LogoutButton = styled.button`
  border: none;
  background: none;
  background-color: transparent;
  width: 24px;
  height: 24px;
  ion-icon {
    height: 24px;
    width: 24px;
  }
`;

const StatementSheet = styled.div`
  width: 100%;
  max-width: 326px;
  height: 446px;
  overflow-y: scroll;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 12px 40px;
  border-radius: 5px;
  position: relative;
`;

const BottomMenu = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  justify-content: space-between;
`;

function Statement() {
  const [isLoading, setLoading] = useState(true);
  const name = localStorage.getItem('name');
  const navigate = useNavigate();
  if (!name) {
    navigate('/');
  }
  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }
  useEffect(() => {
    const promisse = axios.get('aksjdhkahd/statements');
    promisse.then((response) => {
      setLoading(false);
    });
    promisse.catch((error) => {
      alert(
        `Erro: ${error.response.status}\nAlgo deu errado, espere um pouco e tente de novo ou acesse nosso FAQ e procure pelo código do erro presente!`
      );
    });
  }, []);
  if (isLoading) {
    <LoadingPage text="Carregando extrato" />;
  } else {
    return (
      <Container>
        <TopMenu>
          <h2>Olá, {name}!</h2>
          <LogoutButton onClick={handleLogout}>
            <ion-icon name="exit-outline"></ion-icon>
          </LogoutButton>
        </TopMenu>
        <StatementSheet></StatementSheet>
        <BottomMenu>
          <div></div>
          <div></div>
        </BottomMenu>
      </Container>
    );
  }
}

export default Statement;
