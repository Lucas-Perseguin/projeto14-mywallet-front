import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { incomeGreen, outflowRed } from '../../Constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Date = styled.h2`
  font-weight: 400;
  font-size: 16px;
  color: lightgrey;
  margin-right: 6px;
`;

const Description = styled.h2`
  font-weight: 400;
  font-size: 16px;
  color: black;
`;

const Value = styled.h2`
  font-weight: 400;
  font-size: 16px;
  color: ${(props) =>
    (props.isIncome ? { incomeGreen } : { outflowRed }) || 'grey'};
`;

function StatementFragment({ statement, statements, setStatements }) {
  const { date, description, value, isIncome, _id } = statement;
  const navigate = useNavigate();
  function handleDelete() {
    const config = {
      headers: {
        User: localStorage.getItem('username'),
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const promisse = axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/statements/${_id}`,
      config
    );
    promisse.then((response) => {
      statements.forEach((element, index) => {
        if (statement._id === element._id) {
          statements.splice(index, 1);
        }
        setStatements(statements);
      });
    });
    promisse.catch((error) => {
      alert(
        `Erro: ${error.response.status}\nAlgo deu errado, espere um pouco e tente de novo ou acesse nosso FAQ e procure pelo código do erro presente!`
      );
    });
  }
  function handleEdit() {
    navigate(`/editar/${_id}`);
  }
  return (
    <Container>
      <div onClick={handleEdit}>
        <Date>{date}</Date>
        <Description>{description}</Description>
      </div>
      <div>
        <Value isIncome={isIncome}>{value}</Value>
        <button onClick={handleDelete}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>
    </Container>
  );
}

export default StatementFragment;
