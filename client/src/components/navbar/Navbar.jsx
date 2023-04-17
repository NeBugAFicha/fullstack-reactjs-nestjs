import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../store/reducers/userReducer";
import Logo from '../../assets/img/navbar-logo.svg';
import "./navbarCSS/navbar.css";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className='container'>
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">Cloud</div>
        {!isAuth && (
          <div className="navbar__registration">
            <Link to="/registration">Registration</Link>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__login">
            <Link to="/login">Log in</Link>
          </div>
        )}
        {isAuth && (
          <button className="navbar__login" onClick={() => dispatch(logOut())}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
