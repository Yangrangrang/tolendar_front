'use client'
import { useState , useRef } from "react";
import InputForm from "./InputForm";
import axios from "axios";
import { error } from "console";
import { config } from "process";
import PasswordInputForm from "./PasswordInputForm";

export default function LoginPage () {
    const passwordCheckInput = useRef(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(passwordCheckInput.current)

        if (passwordCheckInput.current === true) {

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
    
            // passwordCheck를 안넘기고 싶을때?
            // const field = e.currentTarget.querySelector(`[name="${key}"]`);
            //     if (field && !field.hasAttribute("data-ignore")) {
            //         json[key] = value;
            //     }
            }
    
            axios
                .post("/api/users/register", json)
                .then((response) => {
                    console.log(response);
                    alert(`${json.name}님 환영합니다.`)
                    console.log(response.data);
                    location.replace("/login");
                })
                .catch((error) => {
                    alert("아이디나 이메일이 중복 됩니다.")
                    console.error(error);
                });
        } else {
            alert("입력값을 확인해 주세요.")
            // console.log("Validation failed. Please check your input.");
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-[85%] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-400 underline">
                   Sign up
                </h1>
                <form action={"/api/users/register"} method="post" className="mt-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    < InputForm title="ID" name = "username" type = "text" />
                    < InputForm title="name" name = "name" type = "text"/>
                    < PasswordInputForm setInputPasswordCheck={passwordCheckInput}/>
                    < InputForm title="email" name = "email" type = "email"/>
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
