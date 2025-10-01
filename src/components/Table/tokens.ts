import styled, { css } from 'styled-components';

import { CopyIcon, DeleteIcon } from '../../assets';

export const Container = styled.div`
  position: relative;
`;

export const TableHeader = styled.div<{ isActionsColumn: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.isActionsColumn ? 'space-between' : 'flex-start')};
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: #ffffff50;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export const TableBase = styled.table`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 0;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;

  th {
    width: 25%;
    padding: 0 6px;
    text-align: left;
    font-weight: 400;
    font-size: 1.2rem;
    background-color: #0a508b;
    border-color: #0a508b;
    cursor: pointer;
  }

  td {
    padding: 0;
    border: 1px solid #dbd7d7;
  }
`;

export const ActiveCell = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  color: #0a508b;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;

const iconStyles = css`
  width: 16px;
  height: 16px;
  display: inline-block;
`;

export const StyledCopyIcon = styled(CopyIcon)`
  ${iconStyles}

  &,
  path {
    fill: #ffffff75;
  }
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
  ${iconStyles}
  fill: #ffffff75;
`;

export const Button = styled.button<{ delete?: boolean }>`
  border: 0;
  padding: 0;
  border-radius: 0;
  cursor: pointer;
  background-color: transparent;
  color: #ffffff75;
  font-size: 1.2rem;
  font-weight: 400;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 4px;

  span {
    display: inline-block;

    @media (max-width: 480px) {
      display: none;
    }
  }

  &:hover {
    color: ${(props) => (props.delete ? '#f45d5d' : '#ffffff')};
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
