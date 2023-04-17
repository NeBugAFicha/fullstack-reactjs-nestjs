import React, { useCallback } from "react";
import { useState } from "react";
import { registration } from "../../actions/auth";
import Input from "../../utils/input/Input";
import "./autorizationCSS/authorization.css";
const Registration = () => {
  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
  });

  const createUser = (form) => {
    registration(form);
    setRegForm({
      email: "",
      password: "",
    });
  };
  return (
    <div className="authorization">
      <div className="authorization__header">Registration</div>
      <Input
        type="text"
        value={regForm.email}
        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
        placeholder="Input email..."
      />
      <Input
        type="password"
        value={regForm.password}
        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
        placeholder="Input password..."
      />
      <button
        onClick={() => createUser(regForm)}
        className="authorization__btn"
      >
        Registrate New User!
      </button>
    </div>
  );
};

export default Registration;
