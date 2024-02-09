import SingletonDAO from "../DAO/singletonDAO";

export class AdminPost {
  createPost(name, desc, img, date, state, tags) {
    try {
      return SingletonDAO.createPost(name, desc, img, date, state, tags);
    } catch(error) {
      console.error("Error al crear el Post:", error);
    }
  }

  editPost(id, name, desc, img, date, state, tags) {
    try {
      return SingletonDAO.editPost(id, name, desc, img, date, state, tags);
    } catch(error) {
      console.error("Error al editar el Post:", error);
    }
  }

  deletePost(id) {
    try {
      return SingletonDAO.deletePost(id);
    } catch(error) {
      console.error("Error al eliminar el post:", error);
    }
  }

  getPostType(id) {
    try {
      return SingletonDAO.getPostType(id);
    } catch(error) {
      console.error("Error al obtener el tipo de post:", error);
    }
  }

  getPost(id) {
    try {
      return SingletonDAO.getPost(id);
    } catch(error) {
      console.error("Error al obtener el post:", error);
    }
  }

  getAllPosts() {
    try {
      return SingletonDAO.getAllPosts();
    } catch(error) {
      console.error("Error al obtener los posts:", error);
    }
  }
}