'use client'
import { useEffect } from "react";

export default function ProfilePage (){
    const handlerLogout = () => {
        localStorage.removeItem("access_token");
    }

    useEffect(()=> {
        const logoutLink = document.getElementById("logout-link");
        if (logoutLink) {
            logoutLink.addEventListener("click", handlerLogout);
        }
    },[])

    return (
        <>
        <p className="mt-8 text-s font-light text-center text-gray-700">
            <a
                href="#"
                className="font-medium text-orange-600 hover:underline"
            >
                회원정보 수정
            </a>
        </p>
        <p className="mt-8 text-s font-light text-center text-gray-700">
            <a
                href="/"
                className="font-medium text-orange-600 hover:underline"
                id="logout-link"
            >
                로그아웃
            </a>
        </p>
        <p className="mt-8 text-s font-light text-center text-gray-700">
            <a
                href="#"
                className="font-medium text-orange-600 hover:underline"
            >
                회원탈퇴
            </a>
        </p>
        </>
    )
}