import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobolsStyle from './styles/globals';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobolsStyle />
  </>
);

export default App;
