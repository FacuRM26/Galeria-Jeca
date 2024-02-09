"use client"
import { useState, useEffect } from "react";
import "./admin.css"
import MainController from "../../../Backend/Controller/MainController";
import { useUser } from "../user/user";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminPage() {
  // Input managing data for buttons
  const [currentType, setCurrentType] = useState(0);
  const [state, setState] = useState(true);
  // Input defining data
  let post = ["name", "desc", "date", "tags", "state"];
  let prod = ["name", "brand", "desc", "price", "tags", "state"];
  let curs = ["name", "desc","price", "date_begin","schedule","tags", "state"]; 
  let types = [post, prod,curs];
  // Browser info data
  const User = useUser();
  const router = useRouter();
  const id = useSearchParams().get("id");
  const controller = new MainController();
  // Post content data
  const [img, setImg] = useState({});
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [date_begin, setDateBegin] = useState("");
  const [schedule, setSchedule] = useState("");
 // const {horario, } = useState("");
  const [price, setPrice] = useState(0);
  // Tags section Data
  const [tagText, setTagText] = useState("");
  const [existingTags, setExistingTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  // Page Data
  const [edit, setEdit] = useState(false);
  const [showImageSection, setShowImageSection] = useState(true);
  // useEffect to only let admin users access this page
  useEffect(() => {
    if(User.privileges != "admin" && !User.unset) {
      router.push("/")
    }
  }, [User]); 

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

  // useEffect to get all the tags
  useEffect(()=>{
    async function getTags(){
      const tagList = await controller.getTags();
      setExistingTags(tagList);
      setSuggestedTags(tagList);
    }
    getTags();
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

  // Function to manage posting
  function handlePost() {
    // Use "currentType" to know what kind of post it is
    // 0 = gallery, 1 = product, 2 = course.
    if(selectedTags != []){
      selectedTags.forEach((tag) => {
        if(!existingTags.includes(tag)) {
          controller.insertTag(tag);
        }
      });
    }
    //console.log("Original img:", img);
    async function createPost() {
      let getId;
    
      // Switch case para determinar qué tipo de post hacer
      switch (currentType) {
        case 0:
          getId = await controller.createPost(name, desc, img, date, state, selectedTags);
          router.push("/post?id=" + getId);
          break;
        case 1:
          getId = await controller.createProduct(name, brand, desc, img, price, state, selectedTags);
          router.push("/post?id=" + getId);
          break;
        case 2:
          // Crear un curso
          getId = await controller.createCourse(name, desc, price, date_begin, schedule, state, [selectedTags]);
          router.push("/course");
          break;
        default:
          console.error("Tipo de post no reconocido");
      }
    }
    async function editPost() {
      // Switch case to know what kind of post to make
      let getId
      switch (currentType) {
        case 0:
          getId = await controller.editPost(id, name, desc, img, date, state, selectedTags);
          router.push("/post?id=" + getId);
          break 
        case 1:
          console.log("desc:", desc)
          getId = await controller.editProduct(id, name, brand, desc, img, price, state, selectedTags);
          router.push("/post?id=" + getId);
          break
        case 2:
          getId = await controller.editCourse(id, name, desc, price, date_begin, schedule, state, selectedTags);
          router.push("/course");
          break 
      }
    }
    if(!edit) {
      createPost()
    } else {
      editPost()
    }
  }

  // Function to manage the input and sugested tags
  function handleTagInputChange(e) {
    const text = e.target.value;
    setTagText(text);

    // Filter Tags that match the text being input
    const filteredTags = existingTags.filter((tag) =>
      tag.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestedTags(filteredTags);
  };

  // Function to create a new Tag on enter (A tag that isn't on on the complete list)
  function handleKeyDown(e) {
    if (e.key === 'Enter' && tagText.trim() !== '') {
      e.preventDefault();
      setSelectedTags([...selectedTags, tagText.trim()]);
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
    const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    setSelectedTags(updatedTags);
  };

  // Function to clear the tag selection
  function handleClean(e) {
    setSelectedTags([]);
    e.preventDefault();
  };

  // EDIT
  if(id != null) {
    useEffect(() => {
      setEdit(true);

      async function setEditData() {
        var PostType = await controller.getPostType(id);
        
        if(PostType == -1) {
          PostType = 2;
        }
        setCurrentType(PostType);

        switch(PostType) {
          case 0:
            const Post = await controller.getPost(id);
            setImg(Post.img);
            setDate(Post.date);
            setName(Post.name);
            setDesc(Post.desc);
            setState(Post.state);
            setSelectedTags(Post.tags);
            break
          case 1:
            const Product = await controller.getProduct(id);
            setImg(Product.img);
            setName(Product.name);
            setDesc(Product.desc);
            setState(Product.state);
            setPrice(Product.price);
            setBrand(Product.brand);
            setSelectedTags(Product.tags);
            break
          case 2:
            const Course = await controller.getCourse(id);
            setName(Course.name);
            setDesc(Course.desc);
            setState(Course.state);
            setPrice(Course.price);
            setDateBegin(Course.date_begin);
            setSchedule(Course.schedule);
            setSelectedTags(Course.tags);
            break
          case -1:
            const Course2 = await controller.getCourse(id);
            setName(Course2.name);
            setDesc(Course2.desc);
            setState(Course2.state);
            setPrice(Course2.price);
            setDateBegin(Course2.date_begin);
            setSchedule(Course2.schedule);
            setSelectedTags(Course2.tags);
            break
        }
      }
      setEditData();
    }, [])
  }
    // useEffect para manejar el cambio de tipo de curso
    useEffect(() => {
      // Asumiendo que el tipo de curso es el índice 2 en el array types
      if (currentType === 2) {
        setShowImageSection(false);
      } else {
        setShowImageSection(true);
      }
    }, [currentType]);

  return (  
    <div className="admin_container">
      <div className="center_section order_vertically">
        <h2>Que desea agregar:</h2>
        <div>
          <button id="admin_btn_0" 
          className={
            "button " + 
            (currentType == 0 ? "bg_accent clr_bg" : edit ? "disable" : "bg_dark clr_dark_gray")
          } 
          onClick={() => setCurrentType(0)}>Post</button>
          <button id="admin_btn_1" 
          className={
            "button " + 
            (currentType == 1 ? "bg_accent clr_bg" : edit ? "disable" : "bg_dark clr_dark_gray")
          } 
          onClick={() => setCurrentType(1)}>Producto</button>
          <button id="admin_btn_2"
          className={
            "button " + 
            (currentType == 2 ? "bg_accent clr_bg" : edit ? "disable" : "bg_dark clr_dark_gray")
          }
          onClick={() => setCurrentType(2)}>Curso</button>

        </div>
      </div>
      <div className="center_section order_horizontally">

      {showImageSection && (
        <div className="center_section order_vertically">
          <div>
            Imagen:
          </div>
          <div>
            <label className="input_image bg_shadow clickable">
              <input id="imageInput" className="hide_input" type="file" accept="image/*"/>
              <img className="input_img" id="imagePreview"/>
            </label>
          </div>
        </div>
      )}

        <div className="input_section order_vertically">

          <div className={"order_horizontally input_item " + (types[currentType].includes("name") ? "" : "disable")}>
            <p className="right_text">Nombre:</p>
            <input type="text" className="text_input bg_shadow" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className={"order_horizontally input_item " + (types[currentType].includes("brand") ? "" : "disable")}>
            <p className="right_text">Marca:</p>
            <input type="text" className="text_input bg_shadow" value={brand} onChange={(e) => setBrand(e.target.value)}/>
          </div>

          <div className={"order_horizontally input_item " + (types[currentType].includes("desc") ? "" : "disable")}>
            <p className="right_text">Descripción:</p>
            <textarea rows={4} className="text_input bg_shadow description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
          </div>

          <div className={"order_horizontally input_item " + (types[currentType].includes("date") ? "" : "disable")}>
            <p className="right_text">Fecha:</p>
            <input type="date" className="text_input bg_shadow" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>

          <div className={"order_horizontally input_item " + (types[currentType].includes("date_begin") ? "" : "disable")}>
            <p className="right_text">Fecha inicio:</p>
            <input type="date" className="text_input bg_shadow" value={date_begin} onChange={(e) => setDateBegin(e.target.value)}/>
          </div>

          <div className={"order_horizontally input_item " + (types[currentType].includes("schedule") ? "" : "disable")}>
            <p className="right_text">Horario:</p>
            <input type="text" className="text_input bg_shadow" value={schedule} onChange={(e) => setSchedule(e.target.value)}/>
          </div>

          <div className={"order_horizontally input_item " + (types[currentType].includes("price") ? "" : "disable")}>
            <p className="right_text">Precio:</p>
            <input type="number" className="text_input bg_shadow" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </div>

          <div className={"order_horizontally input_item " + (types[currentType].includes("tags") ? "" : "disable")}>
            <p className="right_text">Categorías:</p>
            <div className="tag_section order_vertically">
              <form className="order_horizontally">
                <input type="text" className="text_input bg_shadow" value={tagText} onKeyDown={handleKeyDown} onChange={handleTagInputChange} placeholder="Buscar o añadir etiquetas"/>
                <button className="button bg_accent clr_bg center_section clean_btn" onClick={handleClean}>Limpiar</button>
              </form>
              <div className="tag_container order_horizontally">
                {suggestedTags.map((tag) => (
                    <div className={(!selectedTags.includes(tag) ? "tag bg_shadow clr_bg unselectable clickable" : "disable")} key={tag} onClick={() => handleAddTag(tag)}>
                     {tag}
                    </div>
                  ))}
              </div>
              <div className="tag_container order_horizontally">
                {selectedTags.map((tag) => (
                  <div className="tag bg_dark clr_bg center_section unselectable clickable" key={tag} onClick={() => handleRemoveTag(tag)}>
                    {tag}
                    <svg className="tag_cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13">
                      <path d="M13 1.30929L11.6907 0L6.5 5.19071L1.30929 0L0 1.30929L5.19071 6.5L0 11.6907L1.30929 13L6.5 7.80929L11.6907 13L13 11.6907L7.80929 6.5L13 1.30929Z" fill="#C2FEFC"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

            <div className={"order_horizontally input_item " + (types[currentType].includes("state") ? "" : "disable")}>
              <p className="right_text">Estado:</p>
              <div className="button_input">
                <button className={"button no_margin " + ( state ? "bg_dark clr_bg half_width" : "bg_shadow clr_bg half_width")} onClick={() => setState(true)}>Disponible</button>
                <button className={"button no_margin " + ( state ? "bg_shadow clr_bg half_width" : "bg_dark clr_bg half_width")} onClick={() => setState(false)}>No Disponible</button>
              </div>
            </div>

        </div>
      </div>
      <button className="button bg_dark_gray clr_shadow fifth_width" onClick={handlePost}>
        {edit ? <>Editar</> : <>Postear</>}
      </button>
    </div>
  );
}