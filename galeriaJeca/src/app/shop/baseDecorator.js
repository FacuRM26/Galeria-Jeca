

import Component from './Component'; 
class BaseDecorator extends Component {
  constructor(component) {
    super();
    this.component = component;
  }

  async saveEvent(purchaseId, date, hour) {
    return this.component.saveEvent(purchaseId, date, hour);
  }

  async getAllEvents() {
    return this.component.getAllEvents();
  }

  async editEvent(eventId, date, hour) {
    return this.component.editEvent(eventId, date, hour);
  }

  async deleteEvent(eventId) {
    return this.component.deleteEvent(eventId);
  }
}

export {BaseDecorator};
