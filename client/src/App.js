import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Profile from "./components/profile/Profile";
import PrivateRoutes from "./components/PrivateRoutes";
import Edit from "./components/profile/Edit";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<Edit/>} />
      </Route>
    </Route>
  )
)


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
