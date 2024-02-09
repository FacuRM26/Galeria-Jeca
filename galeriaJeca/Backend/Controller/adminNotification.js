import SingletonDAO from "../DAO/singletonDAO";

export class AdminNotification {
  async getNotifications(){
    try {
      return SingletonDAO.getNotifications();
    } catch(error) {
      console.error("Error al obtener las notificaciones:", error);
      return [];
    };
  }

  async deleteNotification(id){
    try {
      return SingletonDAO.deleteNotification(id);
    } catch(error) {
      console.error("Error al obtener las notificaciones:", error);
      return [];
    };
  }

  async getAllEvents() {
    try {
      return SingletonDAO.getAllEvents();
    } catch(error) {
      console.error("Error al obtener los eventos:", error);
      return [];
    };
  }

  async editEvent(id, date, hour) {
    try {
      return SingletonDAO.editEvent(id, date, hour);
    } catch(error) {
      console.error("Error al editar los eventos:", error);
      return [];
    };
  }

  async deleteEvent(id, date, hour) {
    try {
      return SingletonDAO.deleteEvent(id, date, hour);
    } catch(error) {
      console.error("Error al deletear los eventos:", error);
      return [];
    };
  }
}