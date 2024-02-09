"use client"
import { useEffect, useState } from "react";
import React from "react";
import "./user.css"
import MainController from "/Backend/Controller/MainController";
import { useUser } from "./user";

export default function EditUser() {
  // Browser Data
  const User = useUser();
  // User setupData
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    phone: "",
  });

  // Function to handle input changes on the fields
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to handle account editting
  function handleEdit(e) {
    e.preventDefault();
    const controller = new MainController;
    controller.editUser(
      userData.fname, 
      userData.lname, 
      userData.phone, 
    );
  };

  // Function to handle account deletion
  function handleDelete() {
    if(window.confirm("¿Desea eliminar su cuenta?")) {
      const controller = new MainController;
      controller.deleteUser();
    }
  };

  // Function to handle sign outs
  function handleClose() {
    const controller = new MainController;
    controller.logout();
  };

  return (
    <div className="login_container bg_bg order_vertically">
      <p className="clr_dark">Editar Cuenta o Cerrar Sesión</p>
      <form onSubmit={(e) => handleEdit(e)}>
        <div className="form_items">
          <div className="form_field">
            <label className="clr_dark_gray" htmlFor="fname">Nombre:</label>
            <input
              className="text_box bg_shadow"
              type="text"
              id="fnameEdit"
              name="fname"
              value={userData.fname}
              onChange={handleInputChange}
              placeholder={User.fname}
            />
          </div>

          <div className="form_field">
            <label className="clr_dark_gray" htmlFor="lname">Apellidos:</label>
            <input
              className="text_box bg_shadow"
              type="text"
              id="lnameEdit"
              name="lname"
              value={userData.lname}
              onChange={handleInputChange}
              placeholder={User.lname}
            />
          </div>

          <div className="form_field">
            <label className="clr_dark_gray" htmlFor="phone">Teléfono:</label>
            <input
              className="text_box bg_shadow"
              type="tel"
              id="phoneEdit"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder={User.phone}
            />
          </div>
        </div>

        <div className="center_section">
          <div className="order_horizontally">
            <button className="form_button bg_shadow clr_dark_gray clickable" type="submit">Editar</button>
            <button className="form_button bg_shadow clr_dark_gray clickable" type="button" onClick={handleDelete}>Eliminar</button>
            <button className="form_button bg_shadow clr_dark_gray clickable" type="button" onClick={handleClose}>Cerrar Sesión</button>
          </div>
        </div>
      </form>
    </div>
  );
};