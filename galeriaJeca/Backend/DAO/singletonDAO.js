
import conectionBD from "./conectionDB"; 
import { collection, query, where, getDocs, getDoc, getDocFromCache, addDoc, deleteDoc, doc, updateDoc, arrayUnion, Timestamp  } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref as firebaseStorageRef, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
export default class SingletonDAO {
  static instance = conectionBD;
  
  //------------------------------ TAG FUNCTIONS BD ----------------------------------------------------------

  static async insertTag(name) {
    if(name == "") {
      console.error("El tag no puede ser vacío.");
      return;
    }
    try {
      const tagsCollection = collection(SingletonDAO.instance.db, "Tags");
      await addDoc(tagsCollection, {name: name});
      console.log("Tag: ", name, " agregado con éxito.")
    } catch {
      console.error("Error al insertar el Tag.", error)
    }
  }

  //----------------------------------------------------------------------------------------

  static async getTags(id) {
    try {
      const tagsCollection = collection(SingletonDAO.instance.db, "Tags");
      const tagsQuery = query(tagsCollection);
  
      const querySnapshot = await getDocs(tagsQuery);
      let tags;
      if(!id) {
        tags = [];
        querySnapshot.forEach((doc) => {
          tags.push(doc.data().name);
        });
      } else {
        tags = {};
        querySnapshot.forEach((doc) => {
          tags[doc.id] =  doc.data().name;
        });
      }
  
      return tags;
    } catch (error) {
      console.error("Error al obtener los tags: ", error);
      return [];
    }
  }

  //------------------------------ POST FUNCTIONS BD ----------------------------------------------------------
  


  static async createPost(name, desc, img, date, state, tags) {
    try {
      // Image uploading to Firebase Storage
      const testRef = firebaseStorageRef(SingletonDAO.instance.storage, "images/post/"+img.name);
      const snapshot = await uploadBytesResumable(testRef, img);

      // Getting the image's URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Getting References for every tag
      const tagRefs = await Promise.all(
        tags.map(async (tagName) => {
          const tagsCollection = collection(SingletonDAO.instance.db, "Tags");
          const tagQuery = query(tagsCollection, where("name", "==", tagName));
          const tagQuerySnapshot = await getDocs(tagQuery);
          if (!tagQuerySnapshot.empty) {
            const tagDoc = tagQuerySnapshot.docs[0];
            return tagDoc.ref;
          }
          return null;
        })
      );

      // Uploading the data of the Post to firestore
      const postCollection = collection(SingletonDAO.instance.db, "Post");
      const docRef = await addDoc(postCollection, {
        name: name,
        img: downloadURL,
        desc: desc,
        date: date,
        state: state,
        tags: tagRefs.filter((tagRef) => tagRef !== null)
      });
      console.log("Post creado exitosamente.");

      // Returning Id for reference
      return docRef.id
    } catch (error) {
      console.error("Error al crear el post:", error);
      return null
    }
  }

  //------------------------------------------------------------------------------------

  static async editPost(id, name, desc, img, date, state, tags) {
    try {
      let downloadURL
      if (typeof img !== 'string') {
        // Upload the image to Firebase Storage
        //onst storageRef = firebaseStorageRef(SingletonDAO.instance.storage, `images/post/${img.name}`);
        const storageRef = firebaseStorageRef(SingletonDAO.instance.storage, "images/post/" + img.name+ "-" + currentDate.getMilliseconds());
        const snapshot = await uploadBytesResumable(storageRef, img);

        // Get the image's URL
        downloadURL = await getDownloadURL(snapshot.ref);
      } else {
        downloadURL = img;
      }

      // Get references for every tag
      const tagRefs = await Promise.all(
        tags.map(async (tagName) => {
          const tagsCollection = collection(SingletonDAO.instance.db, "Tags");
          const tagQuery = query(tagsCollection, where("name", "==", tagName));
          const tagQuerySnapshot = await getDocs(tagQuery);
          if (!tagQuerySnapshot.empty) {
            const tagDoc = tagQuerySnapshot.docs[0];
            return tagDoc.ref;
          }
          // If the tag doesn't exist, you can handle it as you wish (e.g., create it automatically).
          return null;
        })
      );

      // Update the data of the post in Firestore
      const postRef = doc(SingletonDAO.instance.db, "Post", id);
      await updateDoc(postRef, {
        name: name,
        img: downloadURL,
        desc: desc,
        date: date,
        state: state,
        tags: tagRefs.filter((tagRef) => tagRef !== null)
      });
      console.log("Post editado.");

      // Return the post ID for reference
      return id;
    } catch (error) {
      console.error("Error al editar el post:", error);
      return null;
    }
  }

  //------------------------------------------------------------------------------------

  static async deletePost(id) {
    try {
      // Deleting the post off of the firestore db
      const postRef = doc(SingletonDAO.instance.db, "Post", id);
      await deleteDoc(postRef);
      console.log("Post eliminado correctamente.");
  
      // Field for deleting the image off of storage in the future
  
      return true;
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      return false;
    }
  }

  //------------------------------------------------------------------------------------

  static async getPost(id) {
    try {
      const postRef = doc(SingletonDAO.instance.db, "Post", id);
      const postSnapshot = await getDoc(postRef);
  
      if (!postSnapshot.exists()) {
        console.error("El post no existe.");
        return null;
      }
  
      const post = postSnapshot.data();
      const tagPromises = post.tags.map(async (tagRef) => {
        const tagDoc = await getDoc(tagRef);
        if (tagDoc.exists()) {
          const tagData = tagDoc.data();
          return tagData.name;
        }
        return null;
      });
  
      const tags = await Promise.all(tagPromises);
  
      return { ...post, tags: tags.filter((tag) => tag !== null) };
    } catch (error) {
      console.error("Error al obtener el post:", error);
      return null;
    }
  }

  //------------------------------------------------------------------------------------

  static async getPostType(id) {
    const postCollection = collection(SingletonDAO.instance.db, "Post");
    const productCollection = collection(SingletonDAO.instance.db, "Product");
    const purchaseCollection = collection(SingletonDAO.instance.db, "Purchase");
  
    const postDoc = doc(postCollection, id);
    const productDoc = doc(productCollection, id);
    const purchaseDoc = doc(purchaseCollection, id);
  
    const postSnapshot = await getDoc(postDoc);
    const productSnapshot = await getDoc(productDoc);
    const purchaseSnapshot = await getDoc(purchaseDoc);
  
    if (postSnapshot.exists()) {
      return 0; // For Post
    } else if (productSnapshot.exists()) {
      return 1; // For Product
    } else if (purchaseSnapshot.exists()) {
      return 3; // For Product
    } else {
      return -1; // For no type found
    }
  }

  //------------------------------------------------------------------------------------

  static async getAllPosts() {
    try {
        const postCollection = collection(SingletonDAO.instance.db, "Post");
        const querySnapshot = await getDocs(postCollection);
        const posts = [];
        const allTags = await this.getTags(true);

        for (const doc of querySnapshot.docs) {
          const post = doc.data();
          post.id = doc.id;

          const tags = post.tags;
          const tagsData = [];
          if (tags) {
            for (const tagRef of tags) {
              tagsData.push(allTags[tagRef.id]);
            }
          }
          post.tags = tagsData;
          
          posts.push(post); 
        }

        return posts;
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        return [];
    }
  }

  //------------------------------ PRODUCT FUNCTIONS BD ----------------------------------------------------------
  
  static async createProduct(name, brand, desc, img, price, state, tags) {
    try {
      console.log("Data:", [name, brand, desc, img, price, state, tags]);
      // Image uploading to Firebase Storage
      const testRef = firebaseStorageRef(SingletonDAO.instance.storage, "images/product/"+img.name);
      const snapshot = await uploadBytesResumable(testRef, img);

      // Getting the image's URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Getting References for every tag
      const tagRefs = await Promise.all(
        tags.map(async (tagName) => {
          const tagsCollection = collection(SingletonDAO.instance.db, "Tags");
          const tagQuery = query(tagsCollection, where("name", "==", tagName));
          const tagQuerySnapshot = await getDocs(tagQuery);
          if (!tagQuerySnapshot.empty) {
            const tagDoc = tagQuerySnapshot.docs[0];
            return tagDoc.ref;
          }
          // Si el tag no existe, puedes manejarlo como desees (por ejemplo, crearlo automáticamente).
          return null;
        })
      );

      // Uploading the data of the Product to firestore
      const productCollection = collection(SingletonDAO.instance.db, "Product");
      const docRef = await addDoc(productCollection, {
        name: name,
        brand: brand,
        img: downloadURL,
        desc: desc,
        price: price,
        state: state,
        tags: tagRefs.filter((tagRef) => tagRef !== null)
      });
      console.log("Product creado exitosamente.");

      // Returning Id for reference
      return docRef.id
    } catch (error) {
      console.error("Error al crear el product:", error);
      return null
    }
  }

  //------------------------------------------------------------------------------------

  static async editProduct(id, name, brand, desc, img, price, state, tags) {
    try {
      let downloadURL
      if (typeof img !== 'string') {
        // Upload the image to Firebase Storage
        //const storageRef = firebaseStorageRef(SingletonDAO.instance.storage, `images/product/${img.name}`);
        const storageRef = firebaseStorageRef(SingletonDAO.instance.storage, "images/product/" + img.name + "-" + currentDate.getMilliseconds());
        const snapshot = await uploadBytesResumable(storageRef, img);

        // Get the image's URL
        downloadURL = await getDownloadURL(snapshot.ref);
      } else {
        downloadURL = img;
      }

      // Get references for every tag
      const tagRefs = await Promise.all(
        tags.map(async (tagName) => {
          const tagsCollection = collection(SingletonDAO.instance.db, "Tags");
          const tagQuery = query(tagsCollection, where("name", "==", tagName));
          const tagQuerySnapshot = await getDocs(tagQuery);
          if (!tagQuerySnapshot.empty) {
            const tagDoc = tagQuerySnapshot.docs[0];
            return tagDoc.ref;
          }
          // If the tag doesn't exist, you can handle it as you wish (e.g., create it automatically).
          return null;
        })
      );

      // Update the data of the product in Firestore
      const productRef = doc(SingletonDAO.instance.db, "Product", id);
      await updateDoc(productRef, {
        name: name,
        brand: brand,
        img: downloadURL,
        desc: desc,
        price: price,
        state: state,
        tags: tagRefs.filter((tagRef) => tagRef !== null)
      });
      console.log("Product editado.");

      // Return the product ID for reference
      return id;
    } catch (error) {
      console.error("Error al editar el product:", error);
      return null;
    }
  }

  //------------------------------------------------------------------------------------

  static async deleteProduct(id) {
    try {
      // Deleting the product off of the firestore db
      const productRef = doc(SingletonDAO.instance.db, "Product", id);
      await deleteDoc(productRef);
      console.log("Product eliminado correctamente.");
  
      // Field for deleting the image off of storage in the future
  
      return true;
    } catch (error) {
      console.error("Error al eliminar el product:", error);
      return false;
    }
  }

  //------------------------------------------------------------------------------------

  static async getProduct(id) {
    try {
      const productRef = doc(SingletonDAO.instance.db, "Product", id);
      const productSnapshot = await getDoc(productRef);
  
      if (!productSnapshot.exists()) {
        console.error("El product no existe.");
        return null;
      }
  
      const product = productSnapshot.data();
      const tagPromises = product.tags.map(async (tagRef) => {
        const tagDoc = await getDoc(tagRef);
        if (tagDoc.exists()) {
          const tagData = tagDoc.data();
          return tagData.name;
        }
        return null;
      });
  
      const tags = await Promise.all(tagPromises);
  
      return { ...product, tags: tags.filter((tag) => tag !== null) };
    } catch (error) {
      console.error("Error al obtener el product:", error);
      return null;
    }
  }

  //------------------------------------------------------------------------------------

  static async getAllProducts() {
    try {
        const productCollection = collection(SingletonDAO.instance.db, "Product");
        const querySnapshot = await getDocs(productCollection);
        const products = [];
        const allTags = await this.getTags(true);

        for (const doc of querySnapshot.docs) {
          const product = doc.data();
          product.id = doc.id;

          const tags = product.tags;
          const tagsData = [];
          if (tags) {
            for (const tagRef of tags) {
              tagsData.push(allTags[tagRef.id]);
            }
          }
          product.tags = tagsData;
          
          products.push(product); 
        }

        return products;
    } catch (error) {
        console.error("Error al obtener los products:", error);
        return [];
    }
  }

  //------------------------------ USER FUNCTIONS BD ----------------------------------------------------------

  static async editUser(fname, lname, phone, cart) {
    const currentUser = SingletonDAO.instance.auth.currentUser;
    
    try {
      const usersCollection = collection(SingletonDAO.instance.db, "Users");
      const emailQuery = query(usersCollection, where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];

        const userDocRef = doc(SingletonDAO.instance.db, 'Users', userDoc.id);
        if(fname != "") {
          await updateDoc(userDocRef, {fname: fname});
        }
        if(lname != "") {
          await updateDoc(userDocRef, {lname: lname});
        }
        if(phone != "") {
          await updateDoc(userDocRef, {phone: phone});
        }
        if(cart != "") {
          await updateDoc(userDocRef, {cart: cart});
        }

        console.log('Datos del usuario actualizados correctamente');
      } else {
        console.error("El documento del usuario no existe en Firestore.");
      }
    } catch (error) {
      console.error("Error al editar los datos del usuario: ", error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async deleteUser() {
    const currentUser = SingletonDAO.instance.auth.currentUser;
    
    try {
      console.log("CurrentUser: ", currentUser);
      await currentUser.delete();
    } catch (error) {
      alert("Para eliminar tu cuenta debes volver a iniciar sesión.");
      this.logout();
      return;
    }

    try {
      const usersCollection = collection(SingletonDAO.instance.db, "Users");
      const emailQuery = query(usersCollection, where("email", "==", currentUser.email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
      } else {
        console.error("El documento del user no existe en Firestore.");
      }
    } 
    catch {
      console.error("Error al eliminar el documento del usuario:", error);
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async validarUser(email, password) {
    try {
      const userCollection = collection(SingletonDAO.instance.db, "Users");
      const q = query(userCollection, where("email", "==", email));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        await signInWithEmailAndPassword(SingletonDAO.instance.auth, email, password);
        return true
      } else {
        alert("No existe un usuario con ese correo.");
        return false
      }
    } catch {
      alert("La contraseña es incorrecta.");
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async changePassword(email) {
    sendPasswordResetEmail(SingletonDAO.instanceauth, email)
      .then(() => {
        // Email sent.
        console.log("Correo de restablecimiento enviado!");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error al enviar el correo de restablecimiento:", error);
      });
  }

  //-------------------------------------------------------------------------------------------------    

  static async getUserData(email) {
    try {
      const userCollection = collection(SingletonDAO.instance.db, "Users");
      const q = query(userCollection, where("email", "==", email));

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data();
    } catch (error) {
      console.error("Error al obtener datos del user:", email, ", error", error);
      return null; 
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async registerUser(email, password) {
    try {
      await createUserWithEmailAndPassword(SingletonDAO.instance.auth, email, password);
      return true;
    } catch (error) {
      console.error("Error al registrar el user: ", error);
      alert("Ya existe una cuenta con ese email.");
      return false;
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async saveAdditionalUserInfo(email, phone, fname, lname) {
    try {
      const usersCollection = collection(SingletonDAO.instance.db, "Users");
      const q = query(usersCollection, where("email", "==", email));

      const querySnapshot = await getDocs(q);

      const cart = await SingletonDAO.newCart();

      // In case there are no documents with the email it makes a new one
      if (querySnapshot.empty) {
        await addDoc(usersCollection, {
          email: email,
          phone: phone,
          fname: fname,
          lname: lname,
          privileges: "user",
          cart: cart
        });
        return true;
      } else {
        console.error("Ya existe un user con el email: ", email);
        return false;
      }
    } catch (error) {
      console.error("Error al guardar la información adicional del user: ", error);
      return false;
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async logout() {
    try {
      await signOut(SingletonDAO.instance.auth);
      console.log("Sesión cerrada con éxito");
    } catch (error) {
      console.error("Error al cerrar la sesión:", error);
    }
  }
 
  //-------------------------------- CART FUNCTIONS BD ----------------------------------------------------------    
 
  static async newCart() {
    try {
      const cartCollection = collection(SingletonDAO.instance.db, "Cart");
      const cartDocRef = await addDoc(cartCollection, {
          products: []
      });
      return cartDocRef.id;
    } catch (error) {
      console.error("Error al crear nuevo carrito:", error);
      return null; 
    }
  }

  //-------------------------------------------------------------------------------------------------    
 
  static async editProductCart(productId, quantity) {
    try {
      const currentUser = SingletonDAO.instance.auth.currentUser;
      const User = await this.getUserData(currentUser.email);

      const cartRef = doc(SingletonDAO.instance.db, "Cart", User.cart);
      const cartSnapshot = await getDoc(cartRef);
      const productRef = doc(SingletonDAO.instance.db, "Product", productId);
  
      if (!cartSnapshot.exists()) {
        console.error("El carrito no existe.");
        return false;
      }
  
      const cart = cartSnapshot.data();
  
      const productIndex = cart.products.findIndex(product => product.ref.id === productId);
  
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
  
        await updateDoc(cartRef, { products: cart.products });
  
        console.log("El producto se editó correctamente en el carrito.");
        return true;
      } else {
        console.error("El producto no se encontró en el carrito.");
        return false;
      }
    } catch (error) {
      console.error("Error al editar el carrito:", error);
      return false;
    }
  }

  //-------------------------------------------------------------------------------------------------    
 
  static async removeProductCart(productId) {
    try {
      const currentUser = SingletonDAO.instance.auth.currentUser;
      const User = await this.getUserData(currentUser.email);

      const cartRef = doc(SingletonDAO.instance.db, "Cart", User.cart);
      const cartSnapshot = await getDoc(cartRef);

      const cart = cartSnapshot.data();
      const productRef = doc(SingletonDAO.instance.db, "Product", productId);
      const productIndex = cart.products.findIndex(product => product.ref.id === productId);

      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await updateDoc(cartRef, cart);
        console.log("El producto se removió correctamente");
      } else {
        console.log("El producto no se encontró en el carrito");
      }
    } catch (error) {
      console.error("Error al remover el producto del carrito", error);
    }
  }

  //-------------------------------------------------------------------------------------------------    
 
  static async addProductCart(productId, quantity) {
    try {
      console.log(productId, quantity);
      const currentUser = SingletonDAO.instance.auth.currentUser;
      const User = await this.getUserData(currentUser.email);
      console.log(User.cart);

      const cartRef = doc(SingletonDAO.instance.db, "Cart", User.cart);
      const productRef = doc(SingletonDAO.instance.db, "Product", productId);
      console.log(cartRef, productRef);

      const productData = {
        ref: productRef,
        quantity: quantity,
      };

      await updateDoc(cartRef, {
        products: arrayUnion(productData),
      });

      const updatedCartDoc = await getDoc(cartRef);
      const updatedCartData = updatedCartDoc.data();
      console.log(updatedCartData.products);
      
      console.log("Producto añadido al carrito correctamente.");
    } catch (error) {
      console.error("Error al añadir el producto al carrito", error);
  }
}

  //-------------------------------------------------------------------------------------------------    
 
  static async getCart(cartId) {
    try {
      const cartRef = doc(SingletonDAO.instance.db, "Cart", cartId);

      const cartDoc = await getDoc(cartRef);
      const cartData = cartDoc.data();
      let products = [];
      await Promise.all(cartData.products.map(async (product) => {
        const productDoc = await getDoc(product.ref);
        const productData = productDoc.data();
        productData.id = product.ref.id;
        products.push({ 
          data: productData, quantity: product.quantity
        });
      }));
      
      return products
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return [];
    }
  }
  
  //-------------------------------- PURCHASE FUNCTIONS BD ----------------------------------------------------------    
 
  static async savePurchase(price, province, district, street, location, img) {
    try {
      const currentUser = SingletonDAO.instance.auth.currentUser;
      let userData;

      if (currentUser) {
        const userEmail = currentUser.email;
        const usersCollection = collection(SingletonDAO.instance.db, "Users");
        const userQuery = query(usersCollection, where("email", "==", userEmail));
        
        await getDocs(userQuery).then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            userData = userDoc.data();

            console.log("Referencia al usuario:", userData);
          } else {
            console.error("No se encontró un usuario con el email actual.");
            return false
          }
        }).catch((error) => {
          console.error("Error al consultar Firestore:", error);
          return false
        });
      }
      const currentDate = new Date();

      // Image uploading to Firebase Storage
      const testRef = firebaseStorageRef(SingletonDAO.instance.storage, "images/purchase/" + img.name + "-" + currentDate.getMilliseconds());
      const snapshot = await uploadBytesResumable(testRef, img);

      // Getting the image's URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Get here");

      const purchaseCollection = collection(SingletonDAO.instance.db, "Purchase");
      await addDoc(purchaseCollection, {
        cartId: userData.cart,
        userData: userData,
        price:price,
        province:province,
        district:district,
        street:street,
        location:location,
        img:downloadURL,
        state: null
      });
      const purchaseQuery = query(purchaseCollection, where("cartId", "==", userData.cart));
      const purchaseQuerySnapshot = await getDocs(purchaseQuery);
      const purchaseId = purchaseQuerySnapshot.docs[0].id;


      const dayOfMonth = currentDate.getDate();
      const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const monthName = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      const formattedDate = dayOfMonth + " de " + monthName+ " del " + year;
      const msg =  "El usuario de email: " + userData.email + " ha realizado una nueva compra el dia "+ formattedDate +".";
      this.saveNotification("admin@mail.com", msg, purchaseId);

      try {
        const newCartId = await this.newCart();
    
        if (newCartId) {
          await this.editUser("", "", "", newCartId);
          
          console.log("Compra guardada con el nuevo carrito.");
        } else {
          console.error("Error al crear un nuevo carrito.");
        }
      } catch (error) {
        console.error("Error al guardar la compra:", error);
      }

      console.log("Compra creada correctamtente.");
      alert("Transacción guardada con éxito.");
      return true
    } catch (error) {
      console.error("Error al guardar compra: ", error);
      return false
    }
  }

  //-------------------------------------------------------------------------------------------------     

  static async getPurchase(purchaseId) {
    try {
        const purchaseRef = doc(SingletonDAO.instance.db, "Purchase", purchaseId);
        const purchaseSnapshot = await getDoc(purchaseRef);

        if (purchaseSnapshot.exists()) {
            const purchaseData = purchaseSnapshot.data();
            return purchaseData;
        } else {
            console.error("El purchase no existe.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el purchase por ID:", error);
        return null;
    }
  }
  
  //-------------------------------- PURCHASE FUNCTIONS BD ----------------------------------------------------------    
 

  static async getAllPurchases() {
    try {
      const purchasesCollection = collection(SingletonDAO.instance.db, "Purchase");
      const querySnapshot = await getDocs(purchasesCollection);
      const purchases = [];
      const checkedPurchases = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const purchaseData = doc.data();
          const purchaseId = doc.id; // Obtener el ID del documento
          const purchaseWithId = { id: purchaseId, ...purchaseData }; // Agregar el ID a los datos de la compra
          if(purchaseData.state !== true && purchaseData.state !== false){
            purchases.push(purchaseWithId);
          } else {
            checkedPurchases.push(purchaseWithId);
          }
        }
      });
      return [...purchases, ...checkedPurchases];
    } catch (error) {
      console.error("Error al obtener la lista de purchases:", error);
      return [];
    }
  }

  //-------------------------------------------------------------------------------------------------    
 
  static async editStatePurchase(purchaseId, state) {
    try {
      const purchaseRef = doc(SingletonDAO.instance.db, "Purchase", purchaseId);
      const purchaseSnapshot = await getDoc(purchaseRef);
      if (!purchaseSnapshot.exists()) {
        console.error("La compra no existe.");
        return false;
      }  
      const purchase = purchaseSnapshot.data();  
      purchase.state = state;
      await updateDoc(purchaseRef, {state:state});
      const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const currentDay = (new Date().getDay()+6)%7
      const currentDate = new Date();

      let adminMsg = "La compra aprobada se agregó en la agenda para el "
      let msg = "Tu compra ha sido ";

      if (state){
        msg += "aceptada y el envio se realizara el ";
        let countDays;
        if(currentDay < 2 || currentDay == 6){
          countDays = 2-currentDay; 
          if(currentDay == 6){
            countDays = 3;
          }          
          msg += "próximo Martes ";          
          adminMsg += "proximo Martes.";
        }else{
          if(currentDay < 4){
            countDays = 4-currentDay;      
            msg += "próximo Jueves ";            
            adminMsg += "proximo Jueves.";
          }else{
            if(currentDay < 6){
              countDays = 6-currentDay; 
              msg += "próximo Sábado ";              
              adminMsg += "proximo Sábado.";
            }
          }
        }        
        const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate() + countDays-1));
        const nextdayOfMonth = nextDate.getDate();
        const nextmonthName = months[nextDate.getMonth()];
        const nextyear = nextDate.getFullYear();
        const nextformattedDate = nextdayOfMonth + " " + nextmonthName + " del " + nextyear;
        msg += nextformattedDate + ".";

        this.saveNotification("admin@mail.com", adminMsg, purchaseId);
        this.saveEvent(purchaseId, {day: nextDate.getDate(), month: nextDate.getMonth(), year: nextDate.getFullYear(), dayOfWeek: nextDate.getDay()}, 8);
      } else {
        msg += "denegada.";
      }

      this.saveNotification(purchase.userData.email, msg, purchaseId);
      return true;
    } catch (error) {
      console.error("Error al editar compra: ", error);
      return false
    }
  }
  
  //-------------------------------- NOTIFICATION FUNCTIONS BD ----------------------------------------------------------    
 
  static async saveNotification(userEmail, msg, purchaseId) {
    try {      
      const notificationCollection = collection(SingletonDAO.instance.db, "Notification");
      await addDoc(notificationCollection, {
        msg: msg,
        date: Timestamp.now(),
        user: userEmail,
        purchaseId: purchaseId,
      });

      console.log("Notificacion creada correctamtente.");
      return true
    } catch (error) {
      console.error("Error al guardar notificacion: ", error);
      return false
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async deleteNotification(notificationId) {
    try {
      const notificationDocRef = doc(SingletonDAO.instance.db, "Notification", notificationId);
      await deleteDoc(notificationDocRef);
      return true;
    } catch (error) {
      console.error("Error al eliminar notificación: ", error);
      return false;
    }
  }

  //-------------------------------- EVENT FUNCTIONS BD ----------------------------------------------------------    

  static async saveEvent(purchaseId, date, hour) {
    try {
      const eventCollection = collection(SingletonDAO.instance.db, "Event");
  
      const availableDays = [2, 4, 6];
      const availableHours = [8, 9, 10, 11, 12, 14, 15, 16, 17, 18];
  
      const existingEvents = await this.getAllEvents();
  
      const isHourAvailable = (targetDate, targetHour) => {
        return !existingEvents.some(event =>
          event.date.day === targetDate.getDate() &&
          event.date.month === targetDate.getMonth() &&
          event.date.year === targetDate.getFullYear() &&
          event.hour === targetHour &&
          event.date.dayOfWeek === targetDate.getDay()
        );
      };
  
      let currentDate = new Date(date.year, date.month, date.day-1);
  
      while (true) {
        const dayOfWeek = currentDate.getDay();
        if (availableDays.includes(dayOfWeek)) {
          for (const currentHour of availableHours) {
            if (currentHour >= hour && isHourAvailable(currentDate, currentHour)) {
              const newEvent = {
                purchaseId: purchaseId,
                date: {
                  day: currentDate.getDate(),
                  month: currentDate.getMonth(),
                  year: currentDate.getFullYear(),
                  dayOfWeek: dayOfWeek,
                },
                hour: currentHour,
              };
  
              await addDoc(eventCollection, newEvent);
              console.log("Evento creado correctamente:", newEvent);
  
              return true;
            }
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
    } catch (error) {
      console.error("Error al guardar evento: ", error);
      return false;
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async getAllEvents() {
    try {
      const eventCollection = collection(SingletonDAO.instance.db, "Event");
      const eventQuerySnapshot = await getDocs(eventCollection);
  
      const events = [];
  
      eventQuerySnapshot.forEach((doc) => {
        const eventData = doc.data();
        events.push({ id: doc.id, ...eventData });
      });
  
      console.log("Eventos obtenidos correctamente:", events);
      return events;
    } catch (error) {
      console.error("Error al obtener eventos: ", error);
      return [];
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async editEvent(eventId, date, hour) {
    try {
      const eventRef = doc(SingletonDAO.instance.db, "Event", eventId);
      await updateDoc(eventRef, {date:date, hour:hour});
      console.log("Evento editado.")
      return true
    } catch(error) {
      console.error("Error al editar el evento: ", error);
      return false
    }
  }

  //-------------------------------------------------------------------------------------------------    

  static async deleteEvent(eventId) {
    try {
      const eventDocRef = doc(SingletonDAO.instance.db, "Event", eventId);
      await deleteDoc(eventDocRef);
      return true;
    } catch (error) {
      console.error("Error al eliminar evento: ", error);
      return false;
    }
  }

  //-------------------------------- Cursos ----------------------------------------------------------
  static listaCursos = [
    { id:"1", name: "Maquillaje de bodas", desc: "Maquillaje bodas", price: "22", date_begin: "2024-10-24", schedule: "Lunes de 10 a 12", tags: ["makeup"], state: "Disponible" },
    { id:"2", name: "Maquillaje de fiesta", desc: "Maquillaje fiesta", price: "25", date_begin: "2024-10-24", schedule: "Juevesde 10 a 12", tags: ["makeup"], state: "Disponible" },
    { id:"3", name: "Maquillaje de noche", desc: "Maquillaje noche", price: "30", date_begin: "2024-10-24", schedule: "Viernes de 20 a 22", tags: ["makeup"], state: "Disponible" },
    { id:"4", name: "Maquillaje de dia", desc: "Maquillaje dia", price: "35", date_begin: "2024-10-24", schedule: "Sabado de 10 a 12", tags: ["makeup"], state: "Disponible" },
];
static contId=5;
static async createCurso(name, desc, price, date_begin, schedule, state, tags) {

    try {
        const idStr=(this.contId++).toString();
        const curso = {
            id: idStr ,
            name,
            desc,
            price,
            date_begin,
            schedule,
            state,
            tags
        };

        
        this.listaCursos.push(curso);

        // Retorna el curso creado
        return curso;
    } catch (error) {
        console.error("Error al crear el Curso:", error);
        throw error; 
    }
}
static async editCurso(courseId, name, desc, price, date_begin, schedule, state, tags) {
  try {
      const courseIndex = this.listaCursos.findIndex(course => course.id === courseId);

      if (courseIndex !== -1) {
          // Actualiza solo los campos específicos con los parámetros proporcionados
          this.listaCursos[courseIndex] = {
              ...this.listaCursos[courseIndex],
              name: name !== undefined ? name : this.listaCursos[courseIndex].name,
              desc: desc !== undefined ? desc : this.listaCursos[courseIndex].desc,
              price: price !== undefined ? price : this.listaCursos[courseIndex].price,
              date_begin: date_begin !== undefined ? date_begin : this.listaCursos[courseIndex].date_begin,
              schedule: schedule !== undefined ? schedule : this.listaCursos[courseIndex].schedule,
              state: state !== undefined ? state : this.listaCursos[courseIndex].state,
              tags: tags !== undefined ? tags : this.listaCursos[courseIndex].tags,
          };
          console.log("Curso editado correctamente:", this.listaCursos);
          return this.listaCursos[courseIndex];
      } else {
          throw new Error("Curso no encontrado");
      }
  } catch (error) {
      console.error("Error al editar el Curso:", error);
      throw error;
  }
}



static async deleteCurso(courseId) {
  try {
      const courseIndex = this.listaCursos.findIndex(course => course.id === courseId);

      if (courseIndex !== -1) {
          const deletedCurso = this.listaCursos.splice(courseIndex, 1)[0];
          // Retorna el curso eliminado
          return deletedCurso;
      } else {
          throw new Error("Curso no encontrado");
      }
  } catch (error) {
      console.error("Error al eliminar el Curso:", error);
      throw error;
  }
}

static async getCursos() {
  try{return this.listaCursos;}
  catch (error) {
    console.error("Error al obtener todos los cursos ", error);
    throw error; 
}
  
}

// se utilizaria el indic
static async getCurso(id) {
  try {
    console.log(this.listaCursos);
      const curso = this.listaCursos.find(course => course.id === id);

      if (curso) {
          return curso;
      } else {
          throw new Error("Curso no encontrado");
      }
  } catch (error) {
      console.error("Error al obtener el Curso por id:", error);
      throw error;
  }
}


}