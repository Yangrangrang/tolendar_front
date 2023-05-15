'use client'
import { useState } from "react";
import InputForm from "./InputForm";

export default function LoginPage () {
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(e.currentTarget);

        interface FormData {
            [key: string] : string | File;
        }
        
        // FormData 객체에 저장된 값을 출력
        let json : FormData = {};
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
          json[key] = value;
        }

        // 서버로 폼 데이터 전송
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(json)
            });

            const data = await response.json();
            console.log(data);
        } catch (error){
            console.log("test");
            console.error(error);
        }
        
        // 서버로 폼 데이터 전송
        // fetch('/signup', {
        //   method: 'POST',
        //   body: formData
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-[85%] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-400 underline">
                   Sign up
                </h1>
                <form action={"/api/auth/signup"} method="post" className="mt-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    < InputForm name = "ID" type = "text" />
                    < InputForm name = "Password" type = "password" min = {8} max = {20} pattern="[a-z0-9]{1,15}"/>
                    < InputForm name = "Password check" type = "password" min = {8} max = {20} pattern="[a-z0-9]{1,15}"/>
                    < InputForm name = "Name" type = "text"/>
                    < InputForm name = "Email" type = "email"/>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-orange-300 focus:outline-none focus:bg-orange-500">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
