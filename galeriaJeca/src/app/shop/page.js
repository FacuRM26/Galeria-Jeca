"use client"
import './shop.css'; 
import { useState, useEffect } from "react";
import PostCard from '../post/post';
import MainController from '../../../Backend/Controller/MainController';
import Link from 'next/link';

export default function ShopPage() {
  // Posts Data
  const [posts, setPosts] = useState([null]);
  const controller = new MainController();

  // useEffect to get products
  useEffect(() => {
    async function gettingPosts() {
      const getposts = await controller.getAllProducts();
      setPosts(getposts);
    }
    gettingPosts();
  }, []);

  return (
    <>
    {!posts[0] ? 
      <div style={{width:"100%"}} className="center_section">
        <div className="loading"/>
      </div>
    :
    (<div className="shop_page">
      <h1 className="shop_title center_section bg_shadow">Tienda</h1>
      <Link href="/search?type=1&tag=Crema">
        <h2 className="shop_tag_title clr_bg bg_dark">Crema</h2>
      </Link>
      <div className="shop_container">
        <div className="post_row">
        {posts.map((post, index) =>
            <>{index < 3 ? <PostCard key={"1post"+post.id+"index"+index} post={post} postType={1}/> : null}</>
            )}
        </div>
        <div className="post_row">
        {posts.map((post, index) =>
            <>{index < 3 ? <PostCard key={"2post"+post.id+"index"+index} post={post} postType={1}/> : null}</>
            )}
        </div>
      </div>
    <Link href="/search?type=1&tag=Maquillaje">
      <h2 className="shop_tag_title clr_bg bg_dark">Maquillaje</h2>
    </Link>
      <div className="shop_container">
        <div className="post_row">
          {posts.map((post, index) =>
            <>{index < 3 ? <PostCard key={"3post"+post.id+"index"+index} post={post} postType={1}/> : null}</>
            )}
        </div>
        <div className="post_row">
          {posts.map((post, index) =>
            <>{index < 3 ? <PostCard key={"4post"+post.id+"index"+index} post={post} postType={1}/> : null}</>
            )}
        </div>
      </div>

      <Link href="/search?type=1&tag=Bloqueador">
        <h2 className="shop_tag_title clr_bg bg_dark">Bloqueador</h2>
      </Link>
      <div className="shop_container">
        <div className="post_row">
          {posts.map((post, index) =>
            <>{index < 3 ? <PostCard key={"5post"+post.id+"index"+index} post={post} postType={1}/> : null}</>
            )}
        </div>
        <div className="post_row">
          {posts.map((post, index) =>
            <>{index < 3 ? <PostCard key={"6post"+post.id+"index"+index} post={post} postType={1}/> : null}</>
            )}
        </div>
      </div>
    </div>)}
    </>
  );
};
