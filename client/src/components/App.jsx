import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "../actions/auth";
import "./app.css";
import Login from "./authorization/Login";
import Registration from "./authorization/Registration";
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
          {!isAuth && (
            <Routes>
              <Route
                key={"/registration"}
                element={<Registration />}
                path={"/registration"}
              />
              <Route key={"/login"} element={<Login />} path={"/login"} />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
