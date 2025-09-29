import { styled } from 'styled-components';

import './App.css';
import { Table } from './components/Table';
import { useState } from 'react';

const Button = styled.button`
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;

  width: 220px;
  height: 50px;

  cursor: pointer;

  background-color: #1193ff;
  border-radius: 2px;

  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;

  color: #fff;

  &:hover {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Content = styled.div`
  padding: 48px 0;
`;

const Header = styled.div`
  padding: 20px 0;
`;

const Row = styled.div`
  padding: 0 48px;
`;

function App() {
  const [tables, setTables] = useState<number>(0);

  return (
    <div>
      <Header>
        <Row>
          <Button
            onClick={() => {
              setTables((prev) => prev + 1);
            }}
            type="button"
          >
            Create Table
          </Button>
        </Row>
      </Header>

      <Content>
        <Row style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {Array.from(Array(tables).keys()).map((key) => (
            <Table key={key} />
          ))}
        </Row>
      </Content>
    </div>
  );
}

export default App;
