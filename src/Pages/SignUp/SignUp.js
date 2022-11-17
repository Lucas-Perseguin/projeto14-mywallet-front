import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mainPurple, secondaryPurple } from '../../Constants';

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
    color: black;
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
    font-weight: 500;
    border-radius: 5px;
    border: none;
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

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comparePassword, setComparePassword] = useState('');
  const navigate = useNavigate();
  function handleSignUp() {
    if (name && email && password && comparePassword) {
      if (password === comparePassword) {
        const promisse = axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/sign-up`,
          { name, email, password }
        );
        promisse.then((response) => {
          localStorage.setItem('name', `${name}`);
          localStorage.setItem('email', `${email}`);
          localStorage.setItem('token', `${response.data.token}`);
          navigate('/extrato');
        });
        promisse.catch((error) => {
          alert(
            `Erro: ${error.response.status}\nAlgo deu errado, espere um pouco e tente de novo ou acesse nosso FAQ e procure pelo código do erro presente!`
          );
        });
      } else {
        alert('A senha deve ser igual em ambos os campos!');
      }
    } else {
      alert('Todos os campos devem estar preenchidos!');
    }
  }
  return (
    <Container>
      <h1>MyWallet</h1>
      <Form>
        <input
          placeholder="Nome"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <input
          placeholder="E-mail"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          placeholder="Senha"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          placeholder="Confirme a senha"
          onChange={(event) => setComparePassword(event.target.value)}
        ></input>
        <button onClick={handleSignUp}>Cadastrar</button>
      </Form>
      <Link to="/" relative="path">
        <h2>Já tem uma conta? Entre agora!</h2>
      </Link>
    </Container>
  );
}

export default SignUp;
