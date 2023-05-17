'use client'

import RegisterTodo from "./RegisterTodo";
import { useContext , useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import LoginPage from "../login/page";
import Link from "next/link";

type UserContextType = { 
  userId: string | null; 
  userName: string | null 
} | null;

export default function TodoRegisterPage (){

    const userContext = useContext<UserContextType>(UserContext);
    const [isLoggedIn , setIsLoggedIn ] = useState(false);
    console.log(userContext);
    console.log(isLoggedIn);
    
    useEffect(()=> {
        if (userContext) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          // location.href="/login"
        }
    },[userContext])

    return (
        <>
            {
                isLoggedIn? <RegisterTodo /> : null
            }
        </>
    )
}