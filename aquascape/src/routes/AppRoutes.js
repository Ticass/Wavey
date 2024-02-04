import React from "react";
import Root from "../pages/Root";
import Layout from "../pages/Layout";
import RegisterPage from "../pages/Register";
import Login from "../pages/Login";
import ProfilePage from "../pages/Profile";
import {
    Routes,
    Route,
  } from "react-router-dom";
import { socket } from "../socket";

  socket.connect();


  const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Layout />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<Login />} />
          <Route path="waves" element={<Layout />} />
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>
      </Routes>
    );
  }

  export default AppRoutes;
