"use client"
import MainController from "../../../Backend/Controller/MainController";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./notification.css"
import { useUser } from "../user/user";
import conectionDB from "../../../Backend/DAO/conectionDB";

export default function Notification() {
  const User = useUser();
  const [pageNotifications, setPageNotifications] = useState([]);
  const [lastSnapshot, setLastSnapshot] = useState({docs:[]});
  const notificationCollection = collection(conectionDB.db, "Notification");
  const controller = new MainController();  
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


  const unsubscribe = onSnapshot(query(notificationCollection, where("user", "==", User.email)), (snapshot) => {
    const notifications = [];
    if(snapshot.docs.length == lastSnapshot.docs.length) {
      return null;
    }
    setLastSnapshot(snapshot);
    
    snapshot.forEach((doc) => {
      const notificationData = doc.data();
      notificationData.date = doc.data().date.toDate();
      notificationData.id = doc.id;
      notifications.push(notificationData);
    });
    setPageNotifications(notifications);
  });

  useEffect(() => {
    return () => unsubscribe();
  }, []);

  function handleDelete(id) {
    controller.deleteNotification(id);
  }

  return (
    <main className="notification_container bg_bg">
      {pageNotifications.length === 0 ?
        <div className="clr_dark">No hay notificaciones</div> : 
        <>
          <p className="clr_dark">Notificaciones</p>
          <div className="notification_container_scroll order_vertically">
            {pageNotifications.map((notification, index) => (
              <div className="notification bg_shadow clr_dark_gray" key={index}>
                <Link className="notification_description clickable" href={"/schedule?event=" + notification.eventId}>
                  <p>
                    {notification.msg}
                  </p>
                </Link>
                <div className="order_horizontally">
                  <sub style={{opacity:"50%"}} className="clr_dark_gray">
                    {notification.date.getDate() + " de " + months[notification.date.getMonth()]}
                  </sub>
                  <svg className="clickable" onClick={() => handleDelete(notification.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" style={{width:"1.5rem", height:"1.5rem"}}>
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill="#1E1E1E"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </>
      } 
    </main>
  );
}