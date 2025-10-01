import { styled } from 'styled-components';

export const TableContainer = styled.div`
  cursor: default;
  position: relative;
  flex: 1 1 calc(33.333% - 10.6666666667px); // 16-(16/3) = 10.6666666667px
  min-width: 0;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 8px);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

export const Content = styled.div`
  padding: 48px 0;

  @media (max-width: 480px) {
    padding: 16px 0;
  }
`;

export const Header = styled.div`
  padding: 20px 0;
`;

export const Row = styled.div`
  padding: 0 48px;

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const DragHandle = styled.div<{ $isDragging: boolean }>`
  border: 0;
  color: #fff;
  padding: 4px 6px;
  text-align: center;
  font-size: 1.6rem;
  line-height: 1;
  cursor: ${(props) => (props.$isDragging ? 'grabbing' : 'grab')};
`;
