
import { AdminCart } from "./adminCart"; 
import { AdminTag } from "./adminTag";
import { AdminPost } from "./adminPost"; 
import { AdminProduct } from "./adminProduct"; 
import { AdminSocial } from "./adminSocial"; 
import { AdminUser } from "./adminUser"; 
import { AdminPurchase } from "./adminPurchase"; 
import { AdminNotification } from "./adminNotification"; 
import { AdminCurso } from "./adminCurso";



export default class MainController {
    AdminProduct;
    AdminTag;
    AdminPost;
    AdminUser;
    AdminGaleria;
    AdminCart;
    AdminPurchase;
    AdminSocial;
    AdminNotification;
    AdminCurso;
    constructor() {

      // Admins initialization
      this.AdminProduct = new AdminProduct();
      this.AdminTag = new AdminTag();
      this.AdminPost = new AdminPost();
      this.AdminUser = new AdminUser();
      this.AdminCart = new AdminCart();
      this.AdminSocial = new AdminSocial();
      this.AdminPurchase = new AdminPurchase();
      this.AdminNotification = new AdminNotification();
      this.AdminCurso = new AdminCurso();
    }

  //------------------------------ CLAE ADMIN TAGS | TGAS FUNCTIONS ------------------------------------------------------
  
  insertTag(name) {
    try {
      this.AdminTag.insertTag(name);
    }
    catch(error) {
      console.error("Error al insertar Tag", error);
    }
  }

  //------------------------------------------------------------------------------------------------- 

  getTags() {
    try {
      return this.AdminTag.getTags();
    }
    catch(error) {
      console.error("Error al obtener tags", error);
      return [];
    }
  }

 //------------------------------ CLAE ADMIN POST | POST FUNCTIONS ------------------------------------------------------
  
 createPost(name, desc, img, date, state, tags) {
  try {
      return this.AdminPost.createPost(name, desc, img, date, state, tags);
    } catch (error) {
      console.error("Error al crear el maquillaje:", error);
    }
  }

  //-----------------------------------------------------------------------------------------------------------
  
  editPost(id, name, desc, img, date, state, tags) {
    try {
        return this.AdminPost.editPost(id, name, desc, img, date, state, tags);
      } catch (error) {
        console.error("Error al editar el maquillaje:", error);
      }
    }
  
  //-----------------------------------------------------------------------------------------------------------
   
  deletePost(id) {
    try {
      return this.AdminPost.deletePost(id);
    } catch(error) {
      console.error("Error al eliminar el post:", error);
    }
  }

  //-----------------------------------------------------------------------------------------------------------

 getPost(id) { 
  try {
      return this.AdminPost.getPost(id);
    } catch (error) {
      console.error("Error al obtener el post:", error);
    }
  }
  
  //-----------------------------------------------------------------------------------------------------------
  
 getPostType(id) { 
  try {
      return this.AdminPost.getPostType(id);
    } catch (error) {
      console.error("Error al obtener el tipo de post:", error);
    }
  }

  //-----------------------------------------------------------------------------------------------------------
  
 getAllPosts() { 
  try {
      const posts = this.AdminPost.getAllPosts();
      return posts
    } catch (error) {
      console.error("Error al obtener posts:", error);
    }
  }

  //------------------------------ CLAE ADMIN PRODUCT | PRODUCT FUNCTIONS ------------------------------------------------------
  
 createProduct(name, brand, desc, img, price, state, tags) {
    try {
      return this.AdminProduct.createProduct(name, brand, desc, img, price, state, tags);
    } catch (error) {
      console.error("Error al crear el maquillaje:", error);
    }
  }

  //-----------------------------------------------------------------------------------------------------------
  
  editProduct(id, name, brand, desc, img, price, state, tags) {
    try {
        return this.AdminProduct.editProduct(id, name, brand, desc, img, price, state, tags);
      } catch (error) {
        console.error("Error al editar el maquillaje:", error);
      }
    }
  
  //-----------------------------------------------------------------------------------------------------------
   
  deleteProduct(id) {
    try {
      return this.AdminProduct.deleteProduct(id);
    } catch(error) {
      console.error("Error al eliminar el product:", error);
    }
  }

  //-----------------------------------------------------------------------------------------------------------

 getProduct(id) { 
  try {
      return this.AdminProduct.getProduct(id);
    } catch (error) {
      console.error("Error al obtener el product:", error);
    }
  }

  //-----------------------------------------------------------------------------------------------------------
  
 getAllProducts() {
  try {
      const products = this.AdminProduct.getAllProducts();
      return products
    } catch (error) {
      console.error("Error al obtener products:", error);
    }
  }

 //------------------------------ CLAE ADMIN USER | USER FUNCTIONS ------------------------------------------------------
 
  registerAndSaveUserInfo(email, password, phone, fname, lname) {
    try {
      return this.AdminUser.registerAndSaveUserInfo(email, password, phone, fname, lname);
    } catch (error) {
      console.error("Error al validar el user:", error);
      return false; 
    }
  }

  //-------------------------------------------------------------------------------------------------    
  
  editUser(fname, lname, phone) {
    try {
      this.AdminUser.editUser(fname, lname, phone);
    } catch (error) {
      console.error("Error al editar el user:", error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  deleteUser() {
    try {
      this.AdminUser.deleteUser();
    } catch (error) {
      console.error("Error al eliminar el user:", error);
    }
  }

  //-------------------------------------------------------------------------------------------------    
  
  validarUser(email, password) {
    try {
      const isValid = this.AdminUser.validarUser(email, password);
      return isValid;
    } catch (error) {
      console.error("Error al validar el user:", error);
    }
  }

  //-------------------------------------------------------------------------------------------------    
  
  getUserData(email) {
    try {
      return this.AdminUser.getUserData(email);
    } catch (error) {
      console.error("Error al obtener los datos del email '", email, "', error: ", error);
      return null;
    }
  }

  //-------------------------------------------------------------------------------------------------    

  changePassword(email) {
    try {
      this.AdminUser.changePassword(email);
    } catch (error) {
      console.error("Error al cambiar la contraseña del user:", error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  logout() {
    try { 
      this.AdminUser.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:". error)
    }
  }

  //------------------------------ CLAE ADMIN CART | CART FUNCTIONS ------------------------------------------------------

  editProductCart(productId, quantity){
    try { 
      this.AdminCart.editProductCart(productId, quantity);
    } catch (error) {
      console.error("Error al añadir el producto al carrito:". error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  removeProductCart(productId){
    try { 
      this.AdminCart.removeProductCart(productId);
    } catch (error) {
      console.error("Error al remover el producto al carrito:". error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  addProductCart(productId, quantity){
    try {
      this.AdminCart.addProductCart(productId, quantity);
    } catch (error) {
      console.error("Error al añadir el producto al carrito:". error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  getCart(cartId){
    try { 
      const cart = this.AdminCart.getCart(cartId);
      return cart;
    } catch (error) {
      console.error("Error al obtener el carrito:". error);
      return []
    }
  }

  newCart() {
    try { 
      this.AdminCart.newCart();
    } catch (error) {
      console.error("Error al crear el carrito:". error);
    }
  }

  //------------------------------ CLAE ADMIN CART | CART FUNCTIONS ------------------------------------------------------

  savePurchase(price, province, district, street, location, img) {
    try { 
      return this.AdminPurchase.savePurchase(price, province, district, street, location, img);
    } catch {
      console.error("Error al crear la Purchase:". error)
      return false
    }
  }

  //-------------------------------------------------------------------------------------------------    

  editStatePurchase(purchaseId, state){
    try { 
      this.AdminPurchase.editStatePurchase(purchaseId, state);
    } catch {
      console.error("Error al editar la Purchase:". error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  getAllPurchases(){
    try { 
      const purchases = this.AdminPurchase.getPurchases();
      return purchases;
    } catch {
      console.error("Error al obtener las Purchases:". error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  getPurchase(purchaseId){
    try { 
      const purchases = this.AdminPurchase.getPurchase(purchaseId);
      return purchases;
    } catch {
      console.error("Error al obtener las Purchases:". error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  editStatePurchase(purchaseId,state){
    try { 
      const purchases = this.AdminPurchase.editStatePurchase(purchaseId,state);
      return purchases;
    } catch {
      console.error("Error al editar el estado de la Purchase:". error);
    }
  }

  //------------------------------ CLAE ADMIN NOTIFICATIONS | NOTIFICATIONS FUNCTIONS ------------------------------------------------------
  
  getNotifications() {
    try {
      return this.AdminNotification.getNotifications();
    }
    catch(error) {
      console.error("Error al obtener notifications", error);
      return [];
    }
  }

  //-------------------------------------------------------------------------------------------------    

  deleteNotification(id) {
    try {
      return this.AdminNotification.deleteNotification(id);
    }
    catch(error) {
      console.error("Error al eliminar notifications", error);
      return [];
    }
  }

  //------------------------------ CLAE ADMIN EVENTS | EVENTS FUNCTIONS ------------------------------------------------------

  getAllEvents() {
    try {
      return this.AdminNotification.getAllEvents();
    }
    catch(error) {
      console.error("Error al obtener eventos", error);
      return [];
    }
  }

  //-------------------------------------------------------------------------------------------------    

  editEvent(id, date, hour) {
    try {
      return this.AdminNotification.editEvent(id, date, hour);
    }
    catch(error) {
      console.error("Error al editar eventos", error);
      return [];
    }
  }

  //-------------------------------------------------------------------------------------------------    

  deleteEvent(id, date, hour) {
    try {
      return this.AdminNotification.deleteEvent(id, date, hour);
    }
    catch(error) {
      console.error("Error al deletear eventos", error);
      return [];
    }
  }

  //------------------------------ CLASE ADMIN CURSO | FUNCIONES DE CURSO ------------------------------------------------------

  createCourse(name, desc, price , date_begin ,schedule, state, tags) {
    try {
      
      return this.AdminCurso.createCourse(name, desc, price ,date_begin ,schedule, state, tags);
    } catch (error) {
      console.error("Error al crear el curso:", error);
    }
  }

  editCourse(id, name, desc, price, date_begin,schedule, state, tags) {
    try {
      
      return this.AdminCurso.editCourse(id, name, desc, price, date_begin,schedule, state, tags);
    } catch (error) {
      console.error("Error al editar el curso:", error);
    }
  }

  deleteCourse(id) {
    try {
      return this.AdminCurso.deleteCourse(id);
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  }

  getCourse(id) {
    try {
      return this.AdminCurso.getCourse(id);
    } catch (error) {
      console.error("Error al obtener el curso:", error);
    }
  }

  getAllCourses() {
    try {
      const courses = this.AdminCurso.getAllCourses();
      return courses;
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  }
}


        
    

