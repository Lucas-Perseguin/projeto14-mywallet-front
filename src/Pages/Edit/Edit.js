import styled from 'styled-components';
import { mainPurple, secondaryPurple } from '../../Constants.js';
import dotenv from 'dotenv';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage.js';
import axios from 'axios';

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

function Edit() {
  const { statementId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [statement, setStatement] = useState({});
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const promisse = axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/statements/${statementId}`
    );
    promisse.then((response) => {
      setStatement(response.data);
      setLoading(false);
      setValue(response.data.value);
      setDescription(response.data.description);
    });
    promisse.catch((error) => {
      alert(
        `Erro: ${error.response.status}\nAlgo deu errado, espere um pouco e tente de novo ou acesse nosso FAQ e procure pelo código do erro presente!`
      );
    });
  }, [statementId]);
  function handleUpdate() {
    const config = {
      headers: {
        User: localStorage.getItem('username'),
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const data = {
      value,
      description,
      isIncome: statement.isIncome,
    };
    const promisse = axios.put(
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
  if (isLoading) {
    return <LoadingPage text="Carregando informações da entrada/saída!" />;
  } else {
    return (
      <Container>
        <Title>
          <h2>{statement.isIncome ? 'Editar entrada' : 'Editar saída'}</h2>
        </Title>
        <Form>
          <input
            onChange={(event) => setValue(event.target.value)}
            value={value}
            placeholder="Valor"
          ></input>
          <input
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            placeholder="Descrição"
          ></input>
          <button onClick={handleUpdate}>
            {statement.isIncome ? 'Atualizar entrada' : 'Atualizar saída'}
          </button>
        </Form>
      </Container>
    );
  }
}

export default Edit;
