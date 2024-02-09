"use client"
import { useState, useEffect } from "react";
import "./search.css";
import MainController from "../../../Backend/Controller/MainController";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "../user/user";
import PostCard from "../post/post";

export default function SearchPage() {
  // Page Data
  const [gettingPosts, setGettingPosts] = useState(null);
  const [updatePosts, setUpdatePosts] = useState(false);
  const [postType, setPostType] = useState(null);
  const [buttonPostType, setButtonPostType] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  // Posts Data
  const [allPosts, setAllPosts] = useState(null);
  const [pagePosts, setPagePosts] = useState([]);
  // Browser Data
  const User = useUser();
  const [typeVal, setTypeVal] = useState(useSearchParams().get("type"));
  const searchVal = useSearchParams().get("s");
  const tagVal = useSearchParams().get("tag");
  const router = useRouter();
  const controller = new MainController();
  
//-------------------------------------------------------------------------
//controller.getNotifications();
//-------------------------------------------------------------------------

  // Tags data
  const [tagText, setTagText] = useState(""); 
  const [existingTags, setExistingTags] = useState([]); 
  const [selectedTags, setSelectedTags] = useState([]); 
  const [suggestedTags, setSuggestedTags] = useState([]);

  // useEffect to get all the tags
  useEffect(()=>{
    async function getTags(){
      const controller = new MainController();
      const tagList = await controller.getTags();
      setExistingTags(tagList);
      if(tagList.includes(tagVal)) {
        setSelectedTags([tagVal]);
      }
    }
    getTags();
    handlePostType(0);
  }, []);

  // useEffect to get page posts when the whole posts list changes
  useEffect(() => { 
    setPosts();
  }, [allPosts]);

  // useEffect to clear the current posts on screen and calls the function to get the new posts
  useEffect(()=>{
    setGettingPosts(true);
    setPosts();
  }, [selectedTags, searchVal, updatePosts]);

  // useEffect to restart the pagination counter on search or tag selection
  useEffect(()=>{
    setPageNum(0);
  }, [selectedTags, searchVal]);

  // Function that orders the whole posts list in a sublist that takes into consideration pagination and search params
  function setPosts() {
    const savedPostType = postType;
    const emptyTagList = selectedTags.length === 0;
    if(allPosts){
      let posts = []
      const filteredPosts = [];

      for (const post of allPosts) {
        if (savedPostType !== 3) {
          if (searchVal || !emptyTagList) {
            if (
              (post.name.includes(searchVal) || (savedPostType === 1 && post.brand ? post.brand.includes(searchVal) : false) || post.desc.includes(searchVal)) ||
              !searchVal && subgroup(post.tags, selectedTags)
            ) {
              filteredPosts.push(post);
            }
          } else {
            filteredPosts.push(post);
          }
        } else {
          if ((post.userData.fname.includes(searchVal) || post.userData.lname.includes(searchVal) || post.province.includes(searchVal)) || !searchVal) {
            filteredPosts.push(post);
          }
        }
      }
      setMaxPage(allPosts.length != 0 ? Math.ceil(filteredPosts.length / 6) : 0);

      for (let i = 0; i < 6; i++) {
        if ((pageNum * 6) + i < filteredPosts.length) {
          posts.push(filteredPosts[(pageNum * 6) + i]);
        }
      }
      setPagePosts(posts);
      setGettingPosts(false);
    }
  }

  // Function to handle postType changes
  function handlePostType(postTypeNum) {
    if(postTypeNum === postType || gettingPosts) {
      return null
    }
    setPageNum(0);
    setMaxPage(0);
    setGettingPosts(true);
    if(typeVal) {
      if(!(typeVal == 3 && User.privileges != "admin")){
        postTypeNum = parseInt(typeVal);
        setTypeVal(null);
        setPostType(0);
      }
    }
    setButtonPostType(postTypeNum);
    async function fillPosts() {
      let posts = []
      switch(postTypeNum){
        case 0:
          posts = await controller.getAllPosts();
          break
        case 1:
          posts = await controller.getAllProducts();
          break
        case 3:
          posts = await controller.getAllPurchases();
          break
      }
      setAllPosts(posts);
      setPostType(postTypeNum);
    }
    fillPosts();
  };

  // Function to handle tag input and suggestion
  function handleTagInputChange(e) {
    const text = e.target.value;
    setTagText(text);
    if(text != "") {

      // Filtrar etiquetas existentes que coincidan con el texto ingresado
      const filteredTags = existingTags.filter((tag) =>
        tag.toLowerCase().includes(text.toLowerCase())
      );

      setSuggestedTags(filteredTags);
    } else {
      setSuggestedTags([]);
    }
  };

  // Function to select tags
  function handleAddTag(tag) {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Function to unselect tags
  function handleRemoveTag(tag) {
    setGettingPosts(true);
    const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    setSelectedTags(updatedTags);
  };

  // Function to manage the variable search input for it to stay updated
  function searchInputChange(e) {
    const text = e.target.value;
    setSearchInput(text);
  }

  // Function to handle pressing enter on the main search bar
  function search(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push("/search?s=" + searchInput);
    }
  }

  // Function to ease the process of cheching if a group (or array) is a subgroup of another
  function subgroup(group, subgroup) {
    return subgroup.every((subElement) => group.includes(subElement));
  }

  // Function to handle when the left arrow is pressed on the page section
  function handlePageLeft() {
    if(pageNum !== 0){
      setPageNum(pageNum-1); 
      setGettingPosts(true); 
      if(updatePosts) {
        setUpdatePosts(false);
      } else {
        setUpdatePosts(true);
      }
    }
  }

  // Function to handle when the right arrow is pressed on the page section
  function handlePageRight() {
    if(pageNum < maxPage-1){
      setPageNum(pageNum+1); 
      setGettingPosts(true); 
      if(updatePosts) {
        setUpdatePosts(false);
      } else {
        setUpdatePosts(true);
      }
    }
  };

  return (
    <main className="order_vertically search_page_container">
      <div className="bg_dark search_top font_fix center_section">
        <input name="searchbar" className="search_bar" type="search" value={searchInput} onChange={searchInputChange} onKeyDown={search} placeholder="Buscar publicaciones"/>
      </div>
      <div className="search_page order_horizontally">
        <div name="searchContent" className="search_content">
          <div className="search_left">
            {!gettingPosts && gettingPosts !== null ? 
              <>{pagePosts.length === 0 ? 
                (<h1 key="NoFetch" style={{width:"100%", opacity:"0.6"}} className="center_section">No hay posts con las especificaciones seleccionadas.</h1>)
              :
                (pagePosts.map((post, index) =><PostCard key={post.id+index} post={post} postType={postType}/>))}</>
                :
              <div style={{width:"100%"}} className="center_section">
                <div className="loading"/>
              </div>
            }
          </div>

          <div className="center_section order_vertically">
            Página
            <div className="search_page_select bg_dark_gray">
              <svg className={pageNum > 0 ? "clickable page_arrow_icon" : "page_arrow_icon"} xmlns="http://www.w3.org/2000/svg" onClick={() => handlePageLeft()}>
                <path d="M9 1.34091L7.63496 0L0 7.5L7.63496 15L9 13.6591L2.73008 7.5L9 1.34091Z" fill={pageNum !== 0 ? "#C2FEFC" : "rgba(0, 0, 0, 0)"}/>
              </svg>
              <span className="clr_bg">{pageNum+1}</span>
              <svg className={pageNum < maxPage-1 ? "clickable page_arrow_icon" : "page_arrow_icon"} xmlns="http://www.w3.org/2000/svg" onClick={() => handlePageRight()}>
                <path d="M0 1.59L5.85149 7.5L0 13.41L1.57426 15L9 7.5L1.57426 0L0 1.59Z" fill={pageNum < maxPage-1 ? "#C2FEFC" : "rgba(0, 0, 0, 0)"}/>
              </svg>
            </div>
          </div>

        </div>
        <div name="searchSidebar" className="search_sidebar">
          <div className="sidebar_top bg_dark_gray">
            <span className={"unselectable search_post_type " + (buttonPostType == 0 ? "clr_shadow" : "clr_white clickable")} onClick={() => handlePostType(0)}>Galería</span>
            <span style={{width:"0px", height: "70%", border: "1px solid white"}}/>
            <span className={"unselectable search_post_type " + (buttonPostType == 1 ? "clr_shadow" : "clr_white clickable")} onClick={() => handlePostType(1)}>Tienda</span>
            {User.privileges == "admin" ? <>
              <span style={{width:"0px", height: "70%", border: "1px solid white"}}/>
              <span className={"unselectable search_post_type " + (buttonPostType == 3 ? "clr_shadow" : "clr_white clickable")} onClick={() => handlePostType(3)}>Compras</span>
            </> : null}
          </div>
          <div className="sidebar_bottom bg_dark order_vertically clr_white center_section">
          { postType !== 3 ? (
          <><h3 className="sidebar_title unselectable">Categorías</h3>
            <span style={{width:"80%", height: "0px", border: "1px solid white"}}/>
            <input name="sidebarSearchbar" className="sidebar_search_bar" type="search" value={tagText} onChange={handleTagInputChange} placeholder="Buscar o añadir etiquetas"/>


            <div className="tag_container_search order_horizontally">
              {suggestedTags.map((tag, index) => (
                !selectedTags.includes(tag) ? 
                <div className="tag bg_shadow clr_dark unselectable clickable" key={"search_" + tag + "_" +index} onClick={() => handleAddTag(tag)}>
                    {tag}
                </div> : <span key={"dump_" + tag + "_" +index} className="disable"></span>
              ))}
            </div>
            

            <h3 className="sidebar_title unselectable">Actuales</h3>
            <span style={{width:"80%", height: "0px", border: "1px solid white"}}/>

            <div className="tag_container_search order_horizontally">
              {selectedTags.map((tag, index) => (
                <div className="tag bg_dark_gray clr_bg center_section unselectable clickable"key={"selected_" + tag + "_" +index} onClick={() => handleRemoveTag(tag)}>
                  {tag}
                  <svg className="tag_cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13">
                    <path d="M13 1.30929L11.6907 0L6.5 5.19071L1.30929 0L0 1.30929L5.19071 6.5L0 11.6907L1.30929 13L6.5 7.80929L11.6907 13L13 11.6907L7.80929 6.5L13 1.30929Z" fill="#C2FEFC"/>
                  </svg>
                </div>
              ))}
            </div>

            <h3 className="sidebar_title unselectable">Lista</h3>
            <span style={{width:"80%", height: "0px", border: "1px solid white"}}/>


            <div className="tag_container_search order_horizontally">
              {existingTags.map((tag, index) => (
                !selectedTags.includes(tag) ? 
                <div className="tag bg_shadow clr_dark unselectable clickable" key={"search_" + tag + "_" +index} onClick={() => handleAddTag(tag)}>
                    {tag}
                </div> : <span key={"dump_" + tag + "_" +index} className="disable"></span>
              ))}
            </div></>) : null}

          </div>
        </div>
      </div>
    </main>
  );
}