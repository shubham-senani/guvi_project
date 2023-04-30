import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const JWT = localStorage.getItem("token");
  const navigate = useNavigate()
  let auth;
  if (JWT == null) {
    auth = { token: false };
  } else {
    auth = { token: true };
  }

  return auth.token ? (
    <Outlet />
  ) : (
    <>
      
    </>
  );
};

export default PrivateRoutes;