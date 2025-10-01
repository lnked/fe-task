import styled from 'styled-components';

export const InputBase = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  color: #000;
  font-size: 1.6rem;
  font-weight: 400;
  padding: 8px 6px;
  border-radius: 0;
  background-color: #fff;

  &::placeholder {
    font-size: 1.3rem;
    color: #00000030;
  }

  &:focus {
    background-color: #f4f9ff;
    outline: 1px solid #adc6ff;
  }
`;
