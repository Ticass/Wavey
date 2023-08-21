import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.css'
import RegisterPage from './pages/Register';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import Layout from './pages/Layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserProvider from './contexts/user/UserProvider';
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<Login />} />
      <Route path="waves" element={<Layout />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
