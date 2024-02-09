
import Notification from "./notification";

class centerNotification {
    constructor() {
      this.suscriptores = [];
    }
    // agrga los subscriptores 
    addSuscriber(suscriptor) {
      this.suscriptores.push(suscriptor);
    }
  
   // borrar los subscriptores
    deleteSuscriber(suscriptor) {
      this.suscriptores = this.suscriptores.filter(
        (s) => s !== suscriptor
      );
    }

    // notifica a los subscriptores cuando se crea la notificacion 
    async createNotification(userEmail, msg, purchaseId) {
      const notification = {
        msg: msg,
        date: Timestamp.now(),
        user: userEmail,
        purchaseId: purchaseId,
      };
  
      const saved = await Notification.saveNotification(userEmail, msg, purchaseId);      // guardar en bd
  
      if (saved) {
        this.Notification(notification);
        return true;
      } else {
        return false;
      }
    }
    
  // notifica a los suscriptores cuando se elimina una notificacion
    async notificarEliminacion(notificationId) {
      const deleted = await Notification.deleteNotification(notificationId); // se borra de bd
  
      if (deleted) {
        const notification = { notificationId: notificationId };
        this.Notification(notification);
        return true;
      } else {
        return false;
      }
    }
  
    // Método para notificar a los suscriptores
    Notification(notification) {
      this.suscriptores.forEach((suscriptor) => {
        suscriptor.update(notification);
      });
    }
}
export class centerNotification {
  
}