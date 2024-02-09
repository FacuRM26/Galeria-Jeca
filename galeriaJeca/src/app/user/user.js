"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import MainController from "/Backend/Controller/MainController.js";
import { onAuthStateChanged } from "firebase/auth";
import conectionDB from '/Backend/DAO/conectionDB';

const UserContext = createContext();

// Context created to get User data in every page
export function UserProvider({ children }) {
	const [user, setUser] = useState({
		privileges: null,
		email: null,
		fname: null,
		lname: null,
		phone: null,
		cart: null,
		unset: true
	});

	// useEffect to detect automatically that the user had logged in and to get the data from db
	useEffect(() => {
    const unsubscribe = onAuthStateChanged(conectionDB.auth, async (loggedUser) => {
			if (loggedUser) {
				const controller = new MainController();
				const UserData = await controller.getUserData(loggedUser.email);
				setUser({
					email: UserData.email,
					fname: UserData.fname,
					lname: UserData.lname,
					phone: UserData.phone,
					privileges: UserData.privileges,
					cart: UserData.cart,
				});
			} else {
				setUser({
					privileges: null,
					email: null,
					fname: null,
					lname: null,
					phone: null,
					cart: null,
				});
			}
    });

    return () => unsubscribe();
	}, []);

	// The context contains every other page inside except for the layout
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};

// Personalized Hook to use this context
export const useUser = () => {
	return useContext(UserContext);
};