import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styled, { useTheme } from 'styled-components';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 50px;
  z-index: 1000;
  ${(props) =>
    props?.isPageLoader &&
    `position: absolute;
    background-color: ${props?.theme?.colors?.secondary};
    padding: 5px;
    border-radius: 5px;
    `};
  ${(props) => props?.style};
`;

export default function Loader({ style = {}, isPageLoader = false }) {
  const theme = useTheme();

  return (
    <>
      {
        <StyledLoader style={style} isPageLoader={isPageLoader}>
          <TailSpin arialLabel="loading-indicator" height={50} width={50} color={theme.colors.primary} />
        </StyledLoader>
      }
    </>
  );
}
