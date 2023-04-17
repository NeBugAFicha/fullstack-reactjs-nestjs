import React, { useCallback } from "react";
import { useState } from "react";
import { login } from "../../actions/auth";
import Input from "../../utils/input/Input";
import "./autorizationCSS/authorization.css";
import { useDispatch } from "react-redux";
const Login = () => {
  const [logForm, setLogForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const createUser = (form) => {
    dispatch(login(form));
    setLogForm({
      email: "",
      password: "",
    });
  };
  return (
    <div className="authorization">
      <div className="authorization__header">Log in</div>
      <Input
        type="text"
        value={logForm.email}
        onChange={(e) => setLogForm({ ...logForm, email: e.target.value })}
        placeholder="Input email..."
      />
      <Input
        type="password"
        value={logForm.password}
        onChange={(e) => setLogForm({ ...logForm, password: e.target.value })}
        placeholder="Input password..."
      />
      <button
        onClick={() => createUser(logForm)}
        className="authorization__btn"
      >
        Log In!
      </button>
    </div>
  );
};

export default Login;
