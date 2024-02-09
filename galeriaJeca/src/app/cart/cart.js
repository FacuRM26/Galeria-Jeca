"use client"
import "./cart.css"
import { useEffect, useState } from "react";
import { useUser } from "../user/user";
import { useCart } from "./cartProvider";
import MainController from "../../../Backend/Controller/MainController";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const {totalPrice, setTotalPrice, pay, setPay} = useCart();
  const controller = new MainController();
  const User = useUser();

  // useEffect used to get the products of the cart
  useEffect(()=>{
    if(!User.unset) {
      async function fillCart() {
        const currentUser = await controller.getUserData(User.email)
        const cart = await controller.getCart(currentUser.cart);
        setProducts(cart)
        setWaiting(false)
      }
      fillCart();
    }
  }, [User]);

  // useEffect to call change total on product change
  useEffect(()=>{
    changeTotal();
  }, [products])
  
  // Function to add up the total price
  function changeTotal() {
    let price = 0;
    products.forEach((product) => price += product.data.price * product.quantity);
    setTotalPrice(price);
  }

  // Function to remove a product from the cart
  function handleRemoveProduct(productId) {
    console.log(productId)
    controller.removeProductCart(productId);
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.data.id !== productId);
    });
  };

  // Function to subtract 1 from the quantity of a selected product, or to remove it if gone under 1
  function handleMinus(productId) {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.data.id === productId) {
          if (product.quantity > 1) {
            controller.editProductCart(productId, product.quantity - 1);
            return { data: product.data, quantity: product.quantity - 1 };
          } else {
            handleRemoveProduct(product.data.id)
          }
        }
        return product;
      });
    });
  };

  // Function to add 1 from the quantity of a selected product
  function handlePlus(productId) {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.data.id === productId) {
            controller.editProductCart(productId, product.quantity + 1);
            return { data: product.data, quantity: product.quantity + 1 };
        }
        return product;
      });
    });
  }
  
  return (
    <main className="page_container">
      <div className="products_container center_vertically">
        <h2 className="order_horizontally products_topbar clr_dark_gray bg_shadow ">
          <span className="products_topbar_title">Producto</span>
          <span className="unselectable products_topbar_textbar">|</span>
          <span className="products_topbar_text">Cantidad</span>
          <span className="unselectable products_topbar_textbar">|</span>
          <span className="products_topbar_text">Precio</span>
        </h2>
        {!waiting && products == [] ? <h2>No hay productos en el carrito</h2> :
        <>{products.map((product) => (
          <div className="cart_product bg_shadow order_horizontally" key={product.data.id}>
            <div className="product_left order_horizontally">
              <div className="product_img" onClick={()=>handleRemoveProduct(product.data.id)}>
                <img src={product.data.img}/>
                <svg className="remove_icon clickable unselectable" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
                  <path d="M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z"/>
                </svg>
              </div>
              <div className="product_info clr_dark_gray">
                <h2 className="product_info_text">{product.data.brand}</h2>
                <span className="product_info_text clr_dark">{product.data.name}</span>
              </div>
            </div>
            <div className="product_bar_container">
              <div style={{height:"60%", width:"1px", border:"1px solid"}}/>
            </div>
            <div className="product_center center_section">
              <div className="product_counter order_horizontally bg_bg">

                <svg onClick={()=>handleMinus(product.data.id)} className="clickable product_counter_icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                    <path d="M19.7917 13.5417H5.20833V11.4583H19.7917V13.5417Z" fill="#009B95"/>
                </svg>

                <h3 className="unselectable">{product.quantity}</h3>

                <svg onClick={()=>handlePlus(product.data.id)} className="clickable product_counter_icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                  <path d="M19.7917 13.5417H13.5417V19.7917H11.4583V13.5417H5.20833V11.4583H11.4583V5.20833H13.5417V11.4583H19.7917V13.5417Z" fill="#009B95"/>
                </svg>

              </div>
            </div>
            <div className="product_bar_container">
              <div style={{height:"60%", width:"1px", border:"1px solid"}}/>
            </div>
            <div className="product_right center_section">
              <h2>₡{product.data.price * product.quantity}</h2>
            </div>
          </div>
        ))}</>}
      </div>
    </main>
  )
}