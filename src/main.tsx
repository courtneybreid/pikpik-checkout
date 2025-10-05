import CssBaseline from "@mui/material/CssBaseline";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CartProvider } from "./context/CartContext.tsx";
import ContentContainer from "./components/ContentContainer.tsx";
import { Navbar } from "./components/Navbar";

const theme = createTheme();

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/" }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline enableColorScheme />
    <ApolloProvider client={client}>
      <CartProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Navbar />
            <ContentContainer />
          </ThemeProvider>
        </BrowserRouter>
      </CartProvider>
    </ApolloProvider>
  </StrictMode>
);
