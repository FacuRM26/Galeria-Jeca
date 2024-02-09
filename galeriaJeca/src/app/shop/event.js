// ConcreteComponent.js - Clase de objetos envueltos

const Component = require('./Component');
const SingletonDAO = require('./SingletonDAO'); // Importa SingletonDAO desde donde se defina

class ConcreteComponent extends Component {
  static async saveEvent(purchaseId, date, hour) {
    try {
      const eventCollection = SingletonDAO.instance.db.collection("Event");
  
      const availableDays = [2, 4, 6];
      const availableHours = [8, 9, 10, 11, 12, 14, 15, 16, 17, 18];
  
      const existingEvents = await ConcreteComponent.getAllEvents();
  
      const isHourAvailable = (targetDate, targetHour) => {
        return !existingEvents.some(event =>
          event.date.day === targetDate.getDate() &&
          event.date.month === targetDate.getMonth() &&
          event.date.year === targetDate.getFullYear() &&
          event.hour === targetHour &&
          event.date.dayOfWeek === targetDate.getDay()
        );
      };
  
      let currentDate = new Date(date.year, date.month, date.day-1);
  
      while (true) {
        const dayOfWeek = currentDate.getDay();
        if (availableDays.includes(dayOfWeek)) {
          for (const currentHour of availableHours) {
            if (currentHour >= hour && isHourAvailable(currentDate, currentHour)) {
              const newEvent = {
                purchaseId: purchaseId,
                date: {
                  day: currentDate.getDate(),
                  month: currentDate.getMonth(),
                  year: currentDate.getFullYear(),
                  dayOfWeek: dayOfWeek,
                },
                hour: currentHour,
              };
  
              await eventCollection.add(newEvent);
              console.log("Evento creado correctamente:", newEvent);
  
              return true;
            }
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
    } catch (error) {
      console.error("Error al guardar evento: ", error);
      return false;
    }
  }

  static async getAllEvents() {
    try {
      const eventCollection = SingletonDAO.instance.db.collection("Event");
      const eventQuerySnapshot = await eventCollection.get();
  
      const events = [];
  
      eventQuerySnapshot.forEach((doc) => {
        const eventData = doc.data();
        events.push({ id: doc.id, ...eventData });
      });
  
      console.log("Eventos obtenidos correctamente:", events);
      return events;
    } catch (error) {
      console.error("Error al obtener eventos: ", error);
      return [];
    }
  }

  static async editEvent(eventId, date, hour) {
    try {
      const eventRef = SingletonDAO.instance.db.collection("Event").doc(eventId);
      await eventRef.update({ date: date, hour: hour });
      console.log("Evento editado.");
      return true;
    } catch(error) {
      console.error("Error al editar el evento: ", error);
      return false;
    }
  }

  static async deleteEvent(eventId) {
    try {
      const eventDocRef = SingletonDAO.instance.db.collection("Event").doc(eventId);
      await eventDocRef.delete();
      console.log("Evento eliminado.");
      return true;
    } catch (error) {
      console.error("Error al eliminar evento: ", error);
      return false;
    }
  }
}

module.exports = ConcreteComponent;
