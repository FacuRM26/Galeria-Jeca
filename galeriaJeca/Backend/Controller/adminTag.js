import SingletonDAO from "../DAO/singletonDAO";

export class AdminTag {
  insertTag(name){
    try {
      return SingletonDAO.insertTag(name);
    } catch(error) {
      console.error("Hubo un error al crear el Tag:", error);
      return false
    }
  }

  async getTags(){
    try {
      return SingletonDAO.getTags();
    } catch(error) {
      console.error("Error al obtener los tags:", error);
      return [];
    };
  }
}