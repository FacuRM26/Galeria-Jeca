import SingletonDAO from "../DAO/singletonDAO";

export class AdminCart {
  editProductCart(productId, quantity) {
    try {
      SingletonDAO.editProductCart(productId, quantity)
    } catch(error) {
      console.error("Error al editar el producto:", error);
    }
  }

  addProductCart(productId, quantity) {
    try {
      SingletonDAO.addProductCart(productId, quantity)
    } catch(error) {
      console.error("Error al añadir el producto:", error);
    }
  }

  removeProductCart(productId) {
    try {
      SingletonDAO.removeProductCart(productId);
    } catch(error){
      console.error("Error al remover producto:", error)
    }
  }

  getCart(cartId) {
    try {
      const cart = SingletonDAO.getCart(cartId);
      return cart;
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return []
    }
  }
  newCart() {
    try {
      SingletonDAO.newCart();
    } catch (error) {
      console.error("Error al crear el carrito:", error);
    }
  }
}




