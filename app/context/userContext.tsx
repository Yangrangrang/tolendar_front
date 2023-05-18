'use client'
import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

interface UserContextProps {
    children: React.ReactNode;
}

export interface User {
    userId: string;
    userName: string;
}

export const UserContext = createContext<User | null>(null);

export const UserContextProvider: React.FC<UserContextProps> = ({children}) => {

    // userName 값 변경 저장
    const [userContext, setUserContext] = useState<User | null>(null);

    useEffect(() => {
        // 토큰 불러오기
        const localData = localStorage.getItem("access_token");

        if (localData) {
            console.log('프로필 로드')
            axios.get("http://localhost:3000/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${localData}`,
                },
            }).then((response) => {
                const userId = response.data.sub;
                const userName = response.data.aud;
                setUserContext({userId, userName});
            }).catch((error) => {
                console.error(error);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={userContext}>
            {children}
        </UserContext.Provider>
    );
};