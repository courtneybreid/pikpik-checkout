import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './Routes.tsx'

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000/'}),
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query products {
        products {
          id
          name
          price
          inStock
        }
      }
    `,
  })
  .then((result) => console.log(result));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
