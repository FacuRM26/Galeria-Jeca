"use client"
import Purchase from "./purchase";
import Cart from "./cart";
import BottomBar from "./bottomBar";
import { CartProvider, useCart } from "./cartProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserProvider, useUser } from "../user/user";
import "./cart.css"

function PageSelector() {
  const {totalPrice, setTotalPrice, pay, setPay} = useCart();
  return(
    <>
      {pay==0?<Cart/>:
      <Purchase/>}
      <BottomBar/>
    </>
  )
}

export default function CartPage() {
  const router = useRouter();
  const User = useUser();

  // useEffect to only let users users access this page
  useEffect(() => {
    if(User.privileges == null && !User.unset) {
      router.push("/")
    }
  }, [User]); 

  return (
    <CartProvider>
      {User.unset? <div style={{width:"100%"}} className="center_section"><div className="loading"/></div>:
      <PageSelector/>}
    </CartProvider>
  );
}