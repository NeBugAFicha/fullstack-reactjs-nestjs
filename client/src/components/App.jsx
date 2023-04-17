import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "../actions/auth";
import "./appCSS/app.css";
import Login from "./authorization/Login";
import Registration from "./authorization/Registration";
import Disk from './disk/Disk';
import Navbar from "./navbar/Navbar";
const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(auth());
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth ? (
            <Routes>
              <Route
                key={"/registration"}
                element={<Registration />}
                path={"/registration"}
              />
              <Route key={"/login"} element={<Login />} path={"/login"} />
              <Route key={"*"} element={<Navigate to='/login' />} path={"*"} />
            </Routes>
          ): 
          (
            <Routes>
              <Route
                exact
                key={"/"}
                element={<Disk />}
                path={"/"}
              />
              <Route key={"*"} element={<Navigate to='/' />} path={"*"} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
