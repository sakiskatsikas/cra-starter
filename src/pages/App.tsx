import React, { FC } from 'react';
import { Global, css } from '@emotion/core';
import initStyles from 'styles/initStyles';
import logo from 'assets/logo.svg';

import { Header, Main } from 'components/containers';

import { StyledApp } from './App.sc';

const App: FC = () => {
  return (
    <>
      <Global
        styles={css`
          ${initStyles}
        `}
      />

      <StyledApp>
        <Header>
          <img src={logo} alt="logo" />
          <h1>CRA Starter</h1>
        </Header>
        <Main>
          <p>Edit src/App.tsx and save to reload.</p>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </Main>
      </StyledApp>
    </>
  );
};

export default App;
