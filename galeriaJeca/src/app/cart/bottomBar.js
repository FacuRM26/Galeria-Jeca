"use client"
import { useCart } from "./cartProvider";

export default function BottomBar() {
  const { totalPrice, setTotalPrice, pay, setPay } = useCart();
  function handlePressPurchase() {
    if(totalPrice > 0){
      setPay(pay+1);
    } else {
      alert("Necesita tener un producto como mínimo.");
    }
  }

  return (
    <div className="cart_bottombar order_horizontally bg_dark">
      <h2 className="total_price">Precio total: ₡{totalPrice}</h2>
      <button className="button bg_dark_gray clr_dark unselectable" onClick={handlePressPurchase}>{pay==0?<>Comprar</>:<>Completar compra</>}</button>
    </div>
  )
}