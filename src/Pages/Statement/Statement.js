import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainPurple, secondaryPurple } from '../../Constants';
import LoadingPage from '../LoadingPage';
import StatementFragment from './StatementFragment';
import { incomeGreen, outflowRed } from '../../Constants';
import dotenv from 'dotenv';

dotenv.config();

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
  h2 {
    font-weight: 700;
    font-size: 26px;
    color: white;
  }
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
  align-items: center;
  justify-content: ${(props) =>
    (props.statements ? 'flex-start' : 'center') || 'center'};
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
  div {
    width: 155px;
    height: 114px;
    background-color: ${secondaryPurple};
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 6px;
    h2 {
      font-size: 18px;
      font-weight: 700;
    }
  }
`;

const Balance = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 12px;
  bottom: 10px;
  font-weight: 700;
  font-size: 17px;
  h2 {
    color: black;
  }
`;

const BalanceValue = styled.h3`
  font-weight: 400;
  font-size: 14px;
  color: ${(props) =>
    (props.isBalancePositive ? { incomeGreen } : { outflowRed }) || 'grey'};
`;

function Statement() {
  const [isLoading, setLoading] = useState(true);
  const [statements, setStatements] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isBalancePositive, setBalancePositive] = false;
  const name = localStorage.getItem('username');
  const navigate = useNavigate();
  if (!name) {
    navigate('/');
  }
  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }
  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const promisse = axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/statements`,
      config
    );
    promisse.then((response) => {
      setLoading(false);
      if (response.data) {
        setStatements(response.data);
        const auxObject = response.data.map((statement) => {
          if (statement.isIncome) {
            return statement.value;
          } else {
            return -statement.value;
          }
        });
        setBalance(
          auxObject.reduce((sum, value) => {
            return sum + value;
          }, 0)
        );
        if (
          auxObject.reduce((sum, value) => {
            return sum + value;
          }, 0) >= 0
        ) {
          setBalancePositive(true);
        }
      }
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
        <StatementSheet statements={statements}>
          {statements ? (
            statements.map((statement) => (
              <StatementFragment
                key={statement._id}
                statement={statement}
                statements={statements}
                setStatements={setStatements}
              />
            ))
          ) : (
            <h2>Não há registros de entrada ou saída</h2>
          )}
          {statements ? (
            <Balance>
              <h2>Saldo</h2>
              <BalanceValue isBalancePositive={isBalancePositive}>
                {balance}
              </BalanceValue>
            </Balance>
          ) : null}
        </StatementSheet>
        <BottomMenu>
          <div onClick={() => navigate('inserir/entrada')}>
            <ion-icon name="add-circle-outline"></ion-icon>
            <h2>Nova entrada</h2>
          </div>
          <div onClick={() => navigate('inserir/saida')}>
            <ion-icon name="remove-circle-outline"></ion-icon>
            <h2>Nova saída</h2>
          </div>
        </BottomMenu>
      </Container>
    );
  }
}

export default Statement;
