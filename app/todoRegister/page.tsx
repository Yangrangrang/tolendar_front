'use client'

import RegisterTodo from "./RegisterTodo";
import { useContext , useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import LoginPage from "../login/page";


export default function TodoRegisterPage (){

    const userContext = useContext(UserContext);
    const [isLoggedIn , setIsLoggedIn ] = useState(false);
    
    useEffect(()=> {
        if (userContext) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })

    return (
        <>
            {
                isLoggedIn? <RegisterTodo /> : <LoginPage />
            }
        </>
    )
}