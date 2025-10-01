import { css, styled } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Button = styled.button`
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

export const Menu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 280px;
  padding: 16px 20px;
  margin-top: 1px;
  background-color: #fff;
  border-radius: 4px;
  border-top-left-radius: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s, transform 0.2s, visibility 0.2s;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}
`;

export const MenuItem = styled.div`
  width: 100%;
  margin-bottom: 16px;
  transition: background-color 0.15s;
`;

export const MenuInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  padding: 14px;
  background: none;
  border-radius: 4px;
  border: 1px solid #e6ecef;

  &:focus {
    outline: 1px solid #adc6ff;
  }
`;

export const AddButton = styled.button`
  display: block;
  width: 100%;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 10px 14px;
  border: none;
  border-radius: 4px;
  background-color: #1493fe;
`;

export const MenuSelect = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  padding: 14px;
  background: none;
  border-radius: 4px;
  border: 1px solid #e6ecef;
`;
