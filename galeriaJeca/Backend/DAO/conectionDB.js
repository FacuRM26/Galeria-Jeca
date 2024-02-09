import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCd12NxMGHw0ncZNiqEHfjs-Pkajz4cOG4",
  authDomain: "duende-801d5.firebaseapp.com",
  databaseURL: "https://duende-801d5-default-rtdb.firebaseio.com",
  projectId: "duende-801d5",
  storageBucket: "duende-801d5.appspot.com",
  messagingSenderId: "344836919960",
  appId: "1:344836919960:web:312b6692dc774174f5b6ed",
  measurementId: "G-K830PZTTWT"
};

/*
const firebaseConfig = {
  apiKey: "AIzaSyAv0cRQ9EzSKzsKjdBMC4u5QyD_jGcTfNs",
  authDomain: "proyecto-d3279.firebaseapp.com",
  databaseURL: "https://proyecto-d3279-default-rtdb.firebaseio.com/", 
  projectId: "proyecto-d3279",
  storageBucket: "proyecto-d3279.appspot.com",
  messagingSenderId: "301923966478",
  appId: "1:301923966478:web:e9938118456901722fa65f",
  measurementId: "G-T9BSM172WF"
};
*/
class conectionBD {
  constructor() {
    if (conectionBD.instance) {
      return conectionBD.instance;
    }
    

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    this.auth = getAuth(app);
    this.storage = getStorage(app);

    conectionBD.instance = this;
  }
}

export default new conectionBD();



