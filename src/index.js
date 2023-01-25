import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { myTheme } from './components/customDesign/theme';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './contexts/Store';
import { ContextProvider } from './contexts/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider resetCSS theme={myTheme}>
    <HelmetProvider>
      <ContextProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ContextProvider>
    </HelmetProvider>
  </ChakraProvider>
);
