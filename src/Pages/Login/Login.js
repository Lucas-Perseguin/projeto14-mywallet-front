import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainPurple, secondaryPurple } from '../../Constants.js';
import LoadingPage from '../LoadingPage.js';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${mainPurple};
  h2 {
    font-weight: 700;
    font-size: 15px;
  }
`;

const Form = styled.div`
  margin-top: 28px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 326px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  input {
    width: 100%;
    height: 58px;
    color: black;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 700;
  }
  button {
    width: 100%;
    height: 58px;
    background-color: ${secondaryPurple};
    color: white;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    border: none;
    border-radius: 5px;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  function handleLogin() {
    if (email && password) {
      const promisse = axios.post('absk', { email, password });
      promisse.then((response) => {
        localStorage.setItem('email', `${email}`);
        localStorage.setItem('token', `${response.data.token}`);
        navigate('/extrato');
      });
      promisse.catch((error) => {
        alert(
          `Erro: ${error.response.status}\nAlgo deu errado, espere um pouco e tente de novo ou acesse nosso FAQ e procure pelo código do erro presente!`
        );
      });
    }
  }
  if (isLoggedIn) {
    navigate('/extrato');
  }
  useEffect(() => {
    const userSession = { name: '', email: '', token: '' };
    userSession.name = localStorage.getItem('name');
    userSession.email = localStorage.getItem('email');
    userSession.token = localStorage.getItem('token');
    if (userSession.name && userSession.email && userSession.token) {
      setLoggedIn(true);
    }
    setLoading(false);
  }, []);
  if (isLoading) {
    return <LoadingPage text="Checando sessão existente" />;
  } else {
    return (
      <Container>
        <h1>MyWallet</h1>
        <Form>
          <input
            placeholder="E-mail"
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            placeholder="Senha"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button onClick={handleLogin}>Entrar</button>
        </Form>
        <Link to="/cadastro" relative="path">
          <h2>Primeira vez? Cadastre-se!</h2>
        </Link>
      </Container>
    );
  }
}

export default Login;
