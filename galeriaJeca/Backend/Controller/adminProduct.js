import SingletonDAO from "../DAO/singletonDAO";

export class AdminProduct {
  createProduct(name, brand, desc, img, price, state, tags) {
    try {
      return SingletonDAO.createProduct(name, brand, desc, img, price, state, tags);
    } catch(error) {
      console.error("Error al crear el Product:", error);
    }
  }

  editProduct(id, name, brand, desc, img, price, state, tags) {
    try {
      return SingletonDAO.editProduct(id, name, brand, desc, img, price, state, tags);
    } catch(error) {
      console.error("Error al editar el Product:", error);
    }
  }

  deleteProduct(id) {
    try {
      return SingletonDAO.deleteProduct(id);
    } catch(error) {
      console.error("Error al eliminar el product:", error);
    }
  }

  addProduct(product) {
    try {
      return SingletonDAO.addProduct(product);
    } catch(error) {
      console.error("Error al añadir el product:", error);
    }
  }

  getProduct(id) {
    try {
      return SingletonDAO.getProduct(id);
    } catch(error) {
      console.error("Error al obtener el product:", error);
    }
  }

  getAllProducts() {
    try {
      return SingletonDAO.getAllProducts();
    } catch(error) {
      console.error("Error al obtener los products:", error);
    }
  }
}
