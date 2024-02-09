import SingletonDAO from "../DAO/singletonDAO";

export class AdminPurchase {  
  savePurchase(cartId, price, province, district, street, location, img) {
    return SingletonDAO.savePurchase(cartId, price, province, district, street, location, img); 
  }
  
  editStatePurchase(purchaseId, state) {
    return SingletonDAO.editStatePurchase(purchaseId, state);
  }
  
  getPurchases() {
    return SingletonDAO.getAllPurchases();
  }
  
  getPurchase(purchaseId) {
    return SingletonDAO.getPurchase(purchaseId);  
  }
} 