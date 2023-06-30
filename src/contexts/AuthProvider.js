import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from "../Firebase/firebase.config";

export const AuthContext=createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user,setUser]=useState('');
    const [loading,setLoading]=useState(false)


    const createUser=(email,password)=>{
        console.log(email,password)
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle=()=>{
        return signInWithPopup(auth, provider)
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (user) => {
             if (user) {
                 setUser(user)
                 setLoading(false)
             } else {
             }
           });
         return unsubscribe
     },[])


    const logOut=()=>{
        return signOut(auth)
    }

    const authInfo={
        createUser,
        user,
        signIn,
        logOut,
        signInGoogle,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;