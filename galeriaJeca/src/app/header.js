"use client"
import Link from "next/link"
import EditUser from "./user/edit";
import Login from "./user/login";
import Notification from "./notification/notification";
import { useEffect, useRef, useState } from "react";
import { useUser } from "./user/user";

export default function CustomHeader() {
  // Page Data
  const [edit, setEdit] = useState(false);
  const [login, setLogin] = useState(false);
  const [notif, setNotif] = useState(false);
  const loginBoxRef = useRef(null);
  const editBoxRef = useRef(null);
  const notifBoxRef = useRef(null);
  // Browser Data
  const User = useUser();

  // useEffect to close the pop up on user change
  useEffect(() => {
    setLogin(false);
    setEdit(false);
    setNotif(false);
  }, [User])

  // useEffects to close pop ups when clicking outside of them
  useEffect(() => {
    function handleClickOutside(event) {
      if (User.privileges != null || loginBoxRef.current && !loginBoxRef.current.contains(event.target)) {
        setLogin(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [login]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (User.privileges == null || editBoxRef.current && !editBoxRef.current.contains(event.target)) {
        setEdit(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [edit]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (User.privileges == null || notifBoxRef.current && !notifBoxRef.current.contains(event.target)) {
        setNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [notif]);

  return (
    <main className="complete_header">
      {login ? <div ref={loginBoxRef}>
        <Login/>
      </div> : null}
      {edit ? <div ref={editBoxRef}>
        <EditUser/>
      </div> : null}
      {notif ? <div ref={notifBoxRef}>
        <Notification/>
      </div> : null}
      <div className="custom_header">
        <div className="center_section">
          { User.privileges != null ? 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon clickable" onClick={()=>setEdit(true)} viewBox="0 0 23 23">
              <path d="M10.5 10.5C13.4006 10.5 15.75 8.15063 15.75 5.25C15.75 2.34938 13.4006 0 10.5 0C7.59937 0 5.25 2.34938 5.25 5.25C5.25 8.15063 7.59937 10.5 10.5 10.5ZM10.5 13.125C6.99563 13.125 0 14.8837 0 18.375V21H21V18.375C21 14.8837 14.0044 13.125 10.5 13.125Z" fill="white"/>
            </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" className="icon clickable"  onClick={()=>setLogin(true)} viewBox="0 0 23 23">
              <path d="M10.5 2.49375C12.0225 2.49375 13.2563 3.7275 13.2563 5.25C13.2563 6.7725 12.0225 8.00625 10.5 8.00625C8.9775 8.00625 7.74375 6.7725 7.74375 5.25C7.74375 3.7275 8.9775 2.49375 10.5 2.49375ZM10.5 14.3062C14.3981 14.3062 18.5063 16.2225 18.5063 17.0625V18.5063H2.49375V17.0625C2.49375 16.2225 6.60187 14.3062 10.5 14.3062ZM10.5 0C7.59937 0 5.25 2.34937 5.25 5.25C5.25 8.15063 7.59937 10.5 10.5 10.5C13.4006 10.5 15.75 8.15063 15.75 5.25C15.75 2.34937 13.4006 0 10.5 0ZM10.5 11.8125C6.99562 11.8125 0 13.5712 0 17.0625V21H21V17.0625C21 13.5712 14.0044 11.8125 10.5 11.8125Z" fill="white"/>
            </svg>
          }

          { User.privileges != null ?
          <svg xmlns="http://www.w3.org/2000/svg" className="icon clickable" onClick={()=>setNotif(true)}  viewBox="2 3 20 20">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="white"/>
          </svg>
          : null
          }
        </div>
        <Link href="/" className="center_section">
          <h2>Galería de Jeca</h2>
        </Link>
        <div>
          <Link href="/search" className="center_section">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 2 20 20">
              <path d="M16.1458 14.5833H15.3229L15.0312 14.3021C16.0521 13.1146 16.6667 11.5729 16.6667 9.89583C16.6667 6.15625 13.6354 3.125 9.89583 3.125C6.15625 3.125 3.125 6.15625 3.125 9.89583C3.125 13.6354 6.15625 16.6667 9.89583 16.6667C11.5729 16.6667 13.1146 16.0521 14.3021 15.0312L14.5833 15.3229V16.1458L19.7917 21.3438L21.3438 19.7917L16.1458 14.5833ZM9.89583 14.5833C7.30208 14.5833 5.20833 12.4896 5.20833 9.89583C5.20833 7.30208 7.30208 5.20833 9.89583 5.20833C12.4896 5.20833 14.5833 7.30208 14.5833 9.89583C14.5833 12.4896 12.4896 14.5833 9.89583 14.5833Z" fill="white"/>
            </svg>
          </Link>
          { User.privileges == "user" ? 
            <Link href="/cart" className="center_section">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 23 23">
                <path d="M7.29163 18.75C6.14579 18.75 5.21871 19.6875 5.21871 20.8333C5.21871 21.9792 6.14579 22.9167 7.29163 22.9167C8.43746 22.9167 9.37496 21.9792 9.37496 20.8333C9.37496 19.6875 8.43746 18.75 7.29163 18.75ZM1.04163 2.08334V4.16668H3.12496L6.87496 12.0729L5.46871 14.625C5.30204 14.9167 5.20829 15.2604 5.20829 15.625C5.20829 16.7708 6.14579 17.7083 7.29163 17.7083H19.7916V15.625H7.72913C7.58329 15.625 7.46871 15.5104 7.46871 15.3646L7.49996 15.2396L8.43746 13.5417H16.1979C16.9791 13.5417 17.6666 13.1146 18.0208 12.4688L21.75 5.70834C21.8333 5.56251 21.875 5.38543 21.875 5.20834C21.875 4.63543 21.4062 4.16668 20.8333 4.16668H5.42704L4.44788 2.08334H1.04163ZM17.7083 18.75C16.5625 18.75 15.6354 19.6875 15.6354 20.8333C15.6354 21.9792 16.5625 22.9167 17.7083 22.9167C18.8541 22.9167 19.7916 21.9792 19.7916 20.8333C19.7916 19.6875 18.8541 18.75 17.7083 18.75Z" fill="white"/>
              </svg>
            </Link> 
          : <>{ User.privileges == "admin" ? 
            <Link href="/admin" className="admin center_section">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 23 23">
                    <path d="M23 13.1429H13.1429V23H9.85714V13.1429H0V9.85714H9.85714V0H13.1429V9.85714H23V13.1429Z" fill="white"/>
              </svg>
            </Link>
            :
            null
          }</>}
        </div>
      </div>
      <div className="custom_subheader">
        <span>
          <Link href="/gallery">Galería</Link>
        </span><span className="unselectable">|</span><span>
          <Link href="/shop">Tienda</Link>
        </span><span className="unselectable">|</span><span>
          <Link href="/schedule">Agenda</Link>
        </span><span className="unselectable">|</span><span>
          <Link href="/course">Cursos</Link>
        </span>
      </div>
    </main>
  );
}