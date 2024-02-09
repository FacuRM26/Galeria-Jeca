"use client"
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import MainController from "../../../Backend/Controller/MainController";
import Link from "next/link";
import "./post.css";
import { useUser } from "../user/user";
import { useRouter } from "next/navigation";

export default function PostPage() {
  // Browser Data
  const id = useSearchParams().get("id");
  const User = useUser();
  const router = useRouter();
  const controller = new MainController();
  // Post Data
  const [post, setPost] = useState({});
  const [postType, setPostType] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [state, setState] = useState(false);
  
  // useEffect used to get the post based on the id in the url
  useEffect(() => {
    async function getData() {
      const lookUpPostType = await controller.getPostType(id);
      let currentPost
      switch(lookUpPostType){
        case 0:
          currentPost = await controller.getPost(id);
          setPost(currentPost);
          setPostType(0);
          break
        case 1:
          currentPost = await controller.getProduct(id);
          setPost(currentPost);
          setPostType(1);
          break
        case 3:
          currentPost = await controller.getPurchase(id);
          setPost(currentPost);
          setPostType(3);
          setState(currentPost.state)
          const currentCart = await controller.getCart(currentPost.cartId);
          setCart(currentCart)
          break
      }
    }
    getData();
  }, []);

  // Function to take the post to edit as admin
  function handleEdit() {
    router.push("/admin?id="+id)
  }
  
  // Function to handle post deletion as admin
  function handleDelete() {
    if (window.confirm("¿Desea eliminar la publicación?")) {
      switch(postType) {
        case 0:
          controller.deletePost(id);
          router.push("/search");
        case 1:
          controller.deleteProduct(id);
          router.push("/search");

      }
    }
  }

  function handleMinus() {
    if (quantity > 1) {
      setQuantity(quantity-1)
    }
  }

  function handlePlus() {
    setQuantity(quantity+1)
  }

  function handleAddToCart() {
    console.log(id, quantity)
    controller.addProductCart(id, quantity);
  }

  function handleDeny() {
    controller.editStatePurchase(id, false);
    setState(false);
  }
  
  function handleApprove() {
    controller.editStatePurchase(id, true);
    setState(true);
  }

  return (
    <main className="post_page">  
    {postType != -1?
      <div className="post_card order_horizontally bg_shadow">
        <img className="post_card_left post_card_img" src={post.img}/>

        <div className="post_card_right bg_dark_gray clr_white">
          <svg className="post_card_close_icon clickable" onClick={()=>router.push("/search?type=" + postType)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" fill="none">
            <path d="M13 1.30929L11.6907 0L6.5 5.19071L1.30929 0L0 1.30929L5.19071 6.5L0 11.6907L1.30929 13L6.5 7.80929L11.6907 13L13 11.6907L7.80929 6.5L13 1.30929Z" fill="#C2FEFC"/>
          </svg>

          <div className="post_card_right_sections">
            <div>
              <h1 className="post_card_title">{ postType == 0 ? post.name : (postType == 1 ? post.brand : post.userData.fname + " " + post.userData.lname)}</h1>

              { postType !== 0 ?<div className="clr_bg">{postType == 1 ? post.name : post.province + "-" + post.district + "-" + post.street}</div>:null}

              <div  className="post_card_desc clr_bg">
                <>{postType !== 3 ? <>{ post.desc && post.desc.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}</> :
                <>{ post.location && post.location.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}</>
                }</>
                <>{ postType === 3 ? <><br/>{
                    cart.map((product) => (
                      <Link key={product.data.id} href={"/post?id="+product.data.id} target="_blank">
                        <p style={{textDecoration:"underline"}}
                        className="clr_bg">{product.quantity} {product.data.name}</p>
                      </Link>
                    ))
                  }</> : null
                }</>
              </div>

            </div>

            <div>
              <h3 className="clr_bg">{ postType === 0 ? post.date : "Precio ₡" + post.price + " c/u"}</h3>
              <div className="tag_container">
                {post.tags ? (
                  post.tags.map((tag) => (
                    <span key={tag} className="tag bg_bg clr_dark_gray">
                      {tag}
                    </span>
                  ))
                ) : (
                  <p>No hay etiquetas disponibles.</p>
                )}
              </div>
            </div>

          { postType !== 3 ?
          <>{ User.privileges == "admin" ? 
            (<div>
              <svg className="admin_buttons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 21">
                <path className="clickable" onClick={handleEdit} d="M0 16.6256V21H4.37439L17.2759 8.09846L12.9015 3.72407L0 16.6256ZM20.6588 4.71559C21.1137 4.26066 21.1137 3.52576 20.6588 3.07082L17.9292 0.341203C17.4742 -0.113734 16.7393 -0.113734 16.2844 0.341203L14.1497 2.47591L18.5241 6.8503L20.6588 4.71559Z" fill="#8AEAE6"/>
                <path className="clickable" onClick={handleDelete} d="M39.1429 18.6667C39.1429 19.95 40.1714 21 41.4286 21H50.5714C51.8286 21 52.8571 19.95 52.8571 18.6667V4.66667H39.1429V18.6667ZM54 1.16667H50L48.8571 0H43.1429L42 1.16667H38V3.5H54V1.16667Z" fill="#8AEAE6"/>
              </svg> 
            </div> ) :
            ( post.state && User.privileges == "user" ? 
                ( postType == 0 ?
                  null
                : 
                  <div className="order_vertically">
                    <div className="center_section">
                      <h2 className="clr_shadow">
                        Añadir al carrito
                      </h2>
                    </div>
                    <div className="add_to_cart order_horizontally">
                      <div className="product_counter_post order_horizontally bg_shadow">
                        <svg onClick={handleMinus} className="clickable product_counter_icons_post" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                            <path d="M19.7917 13.5417H5.20833V11.4583H19.7917V13.5417Z" fill="#1E1E1E"/>
                        </svg>

                        <h3 className="unselectable clr_dark_gray">{quantity}</h3>

                        <svg onClick={handlePlus} className="clickable product_counter_icons_post" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none">
                          <path d="M19.7917 13.5417H13.5417V19.7917H11.4583V13.5417H5.20833V11.4583H11.4583V5.20833H13.5417V11.4583H19.7917V13.5417Z" fill="#1E1E1E"/>
                        </svg>
                      </div>
                      <div className="center_section">
                        <svg onClick={handleAddToCart} className="clickable" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 20">
                          <path d="M8.59911 7.39352H10.0823V5.16875H12.307V3.68558H10.0823V1.46082H8.59911V3.68558H6.37434V5.16875H8.59911V7.39352ZM5.63275 14.0678C4.81701 14.0678 4.15699 14.7352 4.15699 15.551C4.15699 16.3667 4.81701 17.0342 5.63275 17.0342C6.4485 17.0342 7.11593 16.3667 7.11593 15.551C7.11593 14.7352 6.4485 14.0678 5.63275 14.0678ZM13.0486 14.0678C12.2329 14.0678 11.5729 14.7352 11.5729 15.551C11.5729 16.3667 12.2329 17.0342 13.0486 17.0342C13.8644 17.0342 14.5318 16.3667 14.5318 15.551C14.5318 14.7352 13.8644 14.0678 13.0486 14.0678ZM5.75882 11.6576L5.78107 11.5687L6.4485 10.3599H11.9733C12.5295 10.3599 13.019 10.0558 13.2711 9.59603L16.1336 4.3975L14.8433 3.68558H14.8359L14.0201 5.16875L11.9733 8.87669H6.76738L6.67098 8.67646L5.00982 5.16875L4.30531 3.68558L3.60822 2.2024H1.18323V3.68558H2.6664L5.33612 9.31423L4.33498 11.1311C4.21632 11.3388 4.14958 11.5835 4.14958 11.843C4.14958 12.6588 4.81701 13.3262 5.63275 13.3262H14.5318V11.843H5.94422C5.84782 11.843 5.75882 11.7615 5.75882 11.6576Z" fill="#C2FEFC"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )
              :
                <div>
                  <h1 className="clr_shadow">
                    {User.privileges == "user" ? <>No disponible</> : <>Inicia sesión para interactuar</>}
                  </h1>
                </div>
              )}</> : <>{User.privileges == "admin" && postType === 3 && state !== true && state !== false? 
                <div style={{width:"10%"}} className="validate_buttons clickable">
                  <svg onClick={() => handleDeny()} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 22 22" fill="none">
                    <path d="M11 0C4.917 0 0 4.917 0 11C0 17.083 4.917 22 11 22C17.083 22 22 17.083 22 11C22 4.917 17.083 0 11 0ZM16.5 14.949L14.949 16.5L11 12.551L7.051 16.5L5.5 14.949L9.449 11L5.5 7.051L7.051 5.5L11 9.449L14.949 5.5L16.5 7.051L12.551 11L16.5 14.949Z" fill="#C2FEFC"/>
                  </svg>
                  <svg onClick={() => handleApprove()} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 22 22" fill="none">
                    <path d="M11 0C4.928 0 0 4.928 0 11C0 17.072 4.928 22 11 22C17.072 22 22 17.072 22 11C22 4.928 17.072 0 11 0ZM8.8 16.5L3.3 11L4.851 9.449L8.8 13.387L17.149 5.038L18.7 6.6L8.8 16.5Z" fill="#C2FEFC"/>
                  </svg>
                </div> : null}</>}
          </div>
        </div>
      </div>
      :
      <div className="center_section">
        <div className="order_vertically">
          <div className="loading"/>
        </div>
      </div>
    }
    </main>
    );
}