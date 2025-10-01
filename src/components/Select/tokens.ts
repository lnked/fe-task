import { styled } from 'styled-components';

import { ArrowIcon } from '../../assets';

export const Container = styled.div`
  position: relative;
`;

export const SelectBase = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  padding: 14px;
  background: none;
  border-radius: 4px;
  appearance: none;
  border: 1px solid #e6ecef;
`;

export const Arrow = styled(ArrowIcon)`
  width: 16px;
  height: 16px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
