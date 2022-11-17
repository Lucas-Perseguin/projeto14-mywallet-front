import styled from 'styled-components';
import { incomeGreen, outflowRed } from '../../Constants';

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Date = styled.h2`
  font-weight: 400;
  font-size: 16px;
  color: lightgrey;
`;

const Name = styled.h2`
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

function StatementFragment({ date, name, value, isIncome }) {
  return (
    <Container>
      <div>
        <Date>{date}</Date>
        <Name>{name}</Name>
      </div>
      <Value isIncome={isIncome}>{value}</Value>
    </Container>
  );
}

export default StatementFragment;
