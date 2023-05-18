'use client'

import RegisterTodo from "./RegisterTodo";
import { useContext , useEffect, useState } from "react";
import {User, UserContext} from "../context/userContext";
import LoginPage from "../login/page";
import Link from "next/link";


export default function TodoRegisterPage (){
    const userContext = useContext<User | null>(UserContext);
    const [isLoggedIn , setIsLoggedIn ] = useState(false);
    console.log("userContext" , userContext);

    useEffect(()=> {
        setIsLoggedIn(null !== userContext)
    },[userContext])

    return (
        <>
            {
                isLoggedIn? <RegisterTodo /> : <LoginPage />
            }
        </>
    )
}