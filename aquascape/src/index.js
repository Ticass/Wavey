import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.css'
// import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
} from "react-router-dom";
import UserProvider from './contexts/user/UserProvider';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import AppRoutes from './routes/AppRoutes';

const theme = extendTheme({

})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
  <ChakraProvider theme={theme}>
    <UserProvider>
        <AppRoutes />
    </UserProvider>
  </ChakraProvider>
  </BrowserRouter>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
