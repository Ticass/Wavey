import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/main.css'
import HomePage from './pages/home';
import RegisterPage from './pages/Register';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import Feed from './pages/homefeed/feed'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="home" element={<HomePage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<Login />} />
      <Route path="waves" element={<Feed />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
