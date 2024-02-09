"use client"
import { useState } from "react";
import React from "react";
import "./user.css";
import MainController from "/Backend/Controller/MainController";

export default function Login() {
  // User setupData
  const [loginFormData, setLoginFormData] = useState({
    emailLogin: "",
    passwordLogin: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    phone: "",
  });
  // Page Data
  const [requirePassword, setRequirePassword] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  // Function to handle input change in the login fields
  function handleInputChangeLogin(e) {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  // Function to handle input change in the register fields
  function handleInputChangeRegister(e) {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  // Function to handle login in
  function handleLogin(e) {
    if (loginFormData.passwordLogin) {
      e.preventDefault();
      const controller = new MainController;
      controller.validarUser(loginFormData.emailLogin, loginFormData.passwordLogin);
    }
  };

  // Function to handle password changing
  function handleChangePassword() {
    setRequirePassword(true);
    if (loginFormData.emailLogin) {
      const controller = new MainController;
      controller.changePassword(loginFormData.emailLogin)
    }
  };

  // Function to handle registering
  function handleRegister(e) {
    e.preventDefault();
    const controller = new MainController;
    controller.registerAndSaveUserInfo(registerFormData.email, registerFormData.password, registerFormData.phone, registerFormData.fname, registerFormData.lname);
  };

  return (
    <div>
      <div className="login_container bg_bg order_vertically">
        <p className="clr_dark_gray"><span className={(isLogin ? "clr_dark" : "clickable")} onClick={()=>setIsLogin(true)}>Login</span> | <span className={(!isLogin ? "clr_dark" : "clickable")} onClick={()=>setIsLogin(false)}>Register</span></p>
        <form autoComplete="on" name="login_form" className={(isLogin ? "":"disable")} onSubmit={handleLogin}>
          <div className="form_items">
            <div className="form_field">
              <label className="clr_dark_gray" htmlFor="email">Correo Electrónico:</label>
              <input
                className="text_box bg_shadow"
                type="text"
                id="emailLogin"
                name="emailLogin"
                value={loginFormData.emailLogin}
                onChange={(e) => handleInputChangeLogin(e)}
                required
              />
            </div>
            <div className="form_field">
              <label className="clr_dark_gray" htmlFor="password">Contraseña:</label>
              <input
                className="text_box bg_shadow"
                type="password"
                id="passwordLogin"
                name="passwordLogin"
                value={loginFormData.passwordLogin}
                onChange={(e) => handleInputChangeLogin(e)}
                required={requirePassword}
              />
            </div>
          </div>

          <div className="center_section">
            <div className="order_horizontally">
              <button className="clickable form_button bg_shadow bg_bg" type="submit" onClick={() => setRequirePassword(true)}>Iniciar Sesión</button>
              <button className="clickable form_button bg_shadow bg_bg" onClick={() => handleChangePassword}>Cambiar Contraseña</button>
            </div>
          </div>
        </form>

        <form autoComplete="on" name="register_form" className={(isLogin ? "disable":"")} onSubmit={handleRegister}>
          <div className="form_items">
            <div className="form_field">
              <label className="clr_dark_gray" htmlFor="fname">Nombre:</label>
              <input
                className="text_box bg_shadow"
                type="text"
                id="fname"
                name="fname"
                value={registerFormData.fname}
                onChange={(e) => handleInputChangeRegister(e)}
                required
              />
            </div>

            <div className="form_field">
              <label className="clr_dark_gray" htmlFor="lname">Apellidos:</label>
              <input
                className="text_box bg_shadow"
                type="text"
                id="lname"
                name="lname"
                value={registerFormData.lname}
                onChange={(e) => handleInputChangeRegister(e)}
                required
              />
            </div>

            <div className="form_field">
              <label className="clr_dark_gray" htmlFor="phone">Telefono:</label>
              <input
                className="text_box bg_shadow"
                type="tel"
                id="phone"
                name="phone"
                value={registerFormData.phone}
                onChange={(e) => handleInputChangeRegister(e)}
                required
              />
            </div>

            <div className="form_field">
              <label className="clr_dark_gray" htmlFor="email">Correo Electrónico:</label>
              <input
                className="text_box bg_shadow"
                type="text"
                id="email"
                name="email"
                value={registerFormData.email}
                onChange={(e) => handleInputChangeRegister(e)}
                required
              />
            </div>

            <div className="form_field">
              <label className="clr_dark_gray" htmlFor="password">Contraseña:</label>
              <input
                className="text_box bg_shadow"
                type="password"
                id="password"
                name="password"
                value={registerFormData.password}
                onChange={(e) => handleInputChangeRegister(e)}
                required
              />
            </div>
          </div>

          <div className="center_section">
            <button className="clickable form_button bg_shadow bg_bg" type="submit">Registrar</button>
          </div>
        </form>
      </div>

    </div>
  );
};
