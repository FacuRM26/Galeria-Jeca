"use client"
import React from 'react';
import Link from 'next/link';
import "./post.css"
import MainController from '../../../Backend/Controller/MainController';
import { useState } from 'react';


export default function PostCard({ post, postType }) {
  const controller = new MainController();
  const [state, setState] = useState(post.state);

  function handleAddToCart() {
    controller.addProductCart(post.id, 1);
  }

  function handleDeny(id) {
    controller.editStatePurchase(id, false);
    setState(false);
  }
  
  function handleApprove(id) {
    controller.editStatePurchase(id, true);
    setState(true);
  }

  return (
    <div className={"search_post"}>
      <Link className="order_vertically" href={"/post?id=" + post.id}>
        <h2 className="search_post_title clr_dark_gray">
          {postType === 0 ? post.name : (postType === 1 ? post.brand : (postType === 3 ? post.userData.email : null))}
        </h2>
        <img className="search_post_img bg_dark_gray" src={post.img} />
      </Link>
      <div className="search_post_desc bg_dark_gray order_horizontally">
        <div className="search_post_desc_left order_vertically">
          <div className="search_post_desc_text clr_white">
            {postType === 0 ? post.name : (postType === 1 ? post.desc : post.userData.fname + " - " + post.province + " " + post.district + " " + post.street)}
          </div>
          <div className={!post.price ? "transparent" : "clr_bg"}>₡{post.price}</div>
        </div>
        <div className="search_post_desc_right center_section">
          {postType === 1 ?
            <svg
              className="clickable cart"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 20 20"
              onClick={handleAddToCart}
            >
              <path d="M8.59911 7.39352H10.0823V5.16875H12.307V3.68558H10.0823V1.46082H8.59911V3.68558H6.37434V5.16875H8.59911V7.39352ZM5.63275 14.0678C4.81701 14.0678 4.15699 14.7352 4.15699 15.551C4.15699 16.3667 4.81701 17.0342 5.63275 17.0342C6.4485 17.0342 7.11593 16.3667 7.11593 15.551C7.11593 14.7352 6.4485 14.0678 5.63275 14.0678ZM13.0486 14.0678C12.2329 14.0678 11.5729 14.7352 11.5729 15.551C11.5729 16.3667 12.2329 17.0342 13.0486 17.0342C13.8644 17.0342 14.5318 16.3667 14.5318 15.551C14.5318 14.7352 13.8644 14.0678 13.0486 14.0678ZM5.75882 11.6576L5.78107 11.5687L6.4485 10.3599H11.9733C12.5295 10.3599 13.019 10.0558 13.2711 9.59603L16.1336 4.3975L14.8433 3.68558H14.8359L14.0201 5.16875L11.9733 8.87669H6.76738L6.67098 8.67646L5.00982 5.16875L4.30531 3.68558L3.60822 2.2024H1.18323V3.68558H2.6664L5.33612 9.31423L4.33498 11.1311C4.21632 11.3388 4.14958 11.5835 4.14958 11.843C4.14958 12.6588 4.81701 13.3262 5.63275 13.3262H14.5318V11.843H5.94422C5.84782 11.843 5.75882 11.7615 5.75882 11.6576Z" fill="#C2FEFC"/>
            </svg>
          : <>{postType === 3 && state !== true && state !== false? 
          <div className="validate_buttons clickable">
            <svg onClick={() => handleDeny(post.id)} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 22 22" fill="none">
              <path d="M11 0C4.917 0 0 4.917 0 11C0 17.083 4.917 22 11 22C17.083 22 22 17.083 22 11C22 4.917 17.083 0 11 0ZM16.5 14.949L14.949 16.5L11 12.551L7.051 16.5L5.5 14.949L9.449 11L5.5 7.051L7.051 5.5L11 9.449L14.949 5.5L16.5 7.051L12.551 11L16.5 14.949Z" fill="#C2FEFC"/>
            </svg>
            <svg onClick={() => handleApprove(post.id)} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 22 22" fill="none">
              <path d="M11 0C4.928 0 0 4.928 0 11C0 17.072 4.928 22 11 22C17.072 22 22 17.072 22 11C22 4.928 17.072 0 11 0ZM8.8 16.5L3.3 11L4.851 9.449L8.8 13.387L17.149 5.038L18.7 6.6L8.8 16.5Z" fill="#C2FEFC"/>
            </svg>
          </div> : null}</>}
        </div>
      </div>
    </div>
  );
}