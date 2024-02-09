"use client"
import { useState, useEffect } from "react";
import MainController from "../../../Backend/Controller/MainController";
import "./purchase.css"
import { useCart } from "./cartProvider";
import { useRouter } from "next/navigation";

export default function Purchase() {
  // Browser info data
  const controller = new MainController();
  const provinces = ["San José", "Heredia", "Cartago", "Alajuela", "Puntarenas", "Guanacaste", "Limón"]
  // Post content data
  const [img, setImg] = useState({});
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("San José");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  
  const {totalPrice, setTotalPrice, pay, setPay} = useCart();

  // useEffect to manage the image input
  useEffect(() => {
    document.getElementById("imageInput").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        setImg(file);
        const reader = new FileReader();

        reader.onload = function(e) {
          const imagePreview = document.getElementById("imagePreview");
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        }

        reader.readAsDataURL(file);
      }
    });
  }, []);

  // useEffect to change visual image on img change
  useEffect(()=>{
    if(Object.keys(img) != 0) {
      //console.log(img);
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = img;
      imagePreview.style.display = "block";
    }
  }, [img]);

  useEffect(()=>{
    if(pay > 1){
      if(district != "" && street != "" && img != {}) {
        async function postPurchase() {
          const purchaseBoolean = await controller.savePurchase(totalPrice, province, district, street, location, img)
          console.log("Purchase boolean:", purchaseBoolean)
          
          if(purchaseBoolean){
            setPay(0);
            router.push("/");
          } else{
            alert("El proceso falló")
          }
        }
        postPurchase();
      } else {
        alert("Faltan campos obligatorios")
      }
    } 
  }, [pay])

  return (
    <div className="purchase_container">
      <button className="button bg_dark clr_bg" onClick={()=>setPay(0)}>Atrás</button>
      <main className="center_section">
        <div className="center_section order_horizontally">

          <div className="center_section order_vertically">
            <h2>
              Comprobante de sinpe:
            </h2>
            <br/>
            <div>
              <label className="input_image bg_shadow clickable">
                <input id="imageInput" className="hide_input" type="file" accept="image/*"/>
                <img className="input_img" id="imagePreview"/>
              </label>
            </div>
            <br/>
            <h2>
              Número de depósito: 60715699
            </h2>
          </div>

          <div className="input_section order_vertically">
    
    
            <div className="order_horizontally input_item">
              <p className="right_text">Provincia:</p>
              <select className="text_input bg_shadow" value={province} onChange={(e) => setProvince(e.target.value)}>
                {provinces.map((option, index) => (
                  <option className="bg_bg" key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="order_horizontally input_item">
              <p className="right_text">Cantón:</p>
              <input type="text" className="text_input bg_shadow" value={district} onChange={(e) => setDistrict(e.target.value)}/>
            </div>

            <div className="order_horizontally input_item">
              <p className="right_text">Calle:</p>
              <input type="text" className="text_input bg_shadow" value={street} onChange={(e) => setStreet(e.target.value)}/>
            </div>

            <div className="order_horizontally input_item">
              <p className="right_text">Ubicación específica:</p>
              <textarea rows={4} className="text_input bg_shadow description" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}