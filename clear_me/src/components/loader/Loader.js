import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import styled, { useTheme } from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin: 50px;
  position: absolute;
  zindex: 1000;
`;

export default function Loader() {
  const appContext = useContext(AppContext);
  const theme = useTheme();
  const { isLoading } = appContext?.appState;

  return (
    <>
      {isLoading && (
        <StyledLoader>
          <TailSpin arialLabel="loading-indicator" height={50} width={50} color={theme.colors.primary} />
        </StyledLoader>
      )}
    </>
  );
}
