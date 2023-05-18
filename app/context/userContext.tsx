'use client'
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = createContext<{userId: string | null; userName: string | null} | null>(null);

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {

  // userName 값 변경 저장
  const [userContext, setUserContext] = useState<{userId: string | null; userName: string | null} | null>(null);

  useEffect(() => {
    let userId: string | null = null;
    let userName : string | null = null;

    if (typeof window !== "undefined") {

      // 토큰 불러오기
      const localData = localStorage.getItem("access_token");

      if (localData) {
          axios
            .get("http://localhost:3000/api/auth/profile", {
              headers: {
                Authorization: `Bearer ${localData}`,
              },
            })
            .then((response) => {
              userId = response.data.sub;
              userName = response.data.aud;
              setUserContext({ userId, userName });
            })
            .catch((error) => {
              console.error(error);
            });
      }
    }
  }, []);

  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
};