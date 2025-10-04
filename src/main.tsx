import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './Routes.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000/'}),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <CssBaseline enableColorScheme />
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
)
