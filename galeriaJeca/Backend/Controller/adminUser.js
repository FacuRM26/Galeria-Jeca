import SingletonDAO from "../DAO/singletonDAO";

export class AdminUser {
  registerAndSaveUserInfo(email, password, phone, fname, lname) {
    try {
      if(SingletonDAO.saveAdditionalUserInfo(email, phone, fname, lname)){
        SingletonDAO.registerUser(email, password);
      }
      return true;
    } catch (error) {
      console.error("Error al validar el user:", error);
      return false;
    }
  }

  editUser(fname, lname, phone) {
    try {
      return SingletonDAO.editUser(fname, lname, phone, "");
    } catch (error) {
      console.log("Error al editar el SingletonDAO.", error);
    }
  }

  deleteUser() {
    try {
      return SingletonDAO.deleteUser();
    } catch (error) {
      console.error("Error al eliminar el user:", error);
      return false; 
    }
  }

  validarUser(email, password) {
    try {
      return SingletonDAO.validarUser(email, password);
    } catch (error) {
      console.error("Error al validar el user:", error);
      return false; 
    }
  }

  getUserData(email) {
    try {
      return SingletonDAO.getUserData(email);
    } catch (error) {
      console.error("Error al obtener datos del user '", email, "', error: ", error);
      return null; 
    }
  }

  changePassword(email) {
    try {
      return SingletonDAO.changePassword(email);
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      return null; 
    }
  }

  logout() {
    try {
      return SingletonDAO.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return null; 
    }
  }
}

