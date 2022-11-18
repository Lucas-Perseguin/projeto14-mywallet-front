import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { mainPurple, secondaryPurple } from '../../Constants.js';
import dotenv from 'dotenv';

dotenv.config();

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${mainPurple};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const Form = styled.div`
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

function Insert() {
  const { type } = useParams();
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  let isIncome = true;
  if (type === 'entrada') {
    isIncome = true;
  } else if (type === 'saida') {
    isIncome = false;
  } else {
    alert('Parametro de rota inexistente');
  }
  function handleInsert() {
    const config = {
      headers: {
        User: localStorage.getItem('username'),
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const data = {
      value,
      description,
      isIncome,
    };
    const promisse = axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/statements`,
      data,
      config
    );
    promisse.then((response) => {
      navigate('/extrato');
    });
    promisse.catch((error) => {
      alert(
        `Erro: ${error.response.status}\nAlgo deu errado, espere um pouco e tente de novo ou acesse nosso FAQ e procure pelo código do erro presente!`
      );
    });
  }
  return (
    <Container>
      <Title>
        <h2>{isIncome ? 'Nova entrada' : 'Nova saída'}</h2>
      </Title>
      <Form>
        <input
          onChange={(event) => setValue(event.target.value)}
          placeholder="Valor"
        ></input>
        <input
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descrição"
        ></input>
        <button onClick={handleInsert}>
          {isIncome ? 'Salvar entrada' : 'Salvar saída'}
        </button>
      </Form>
    </Container>
  );
}

export default Insert;
