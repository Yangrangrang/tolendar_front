'use client'
import { useState } from "react";
import InputForm from "./InputForm";
import axios from "axios";
import { error } from "console";
import { config } from "process";

export default function LoginPage () {
    const [validatePassword , setValidatePassword] = useState(true);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwordInput = document.getElementsByName("password")[0] as HTMLInputElement;
        const passwordCheckInput = document.getElementsByName("PasswordCheck")[0] as HTMLInputElement;
        const password = passwordInput.value;
        const passwordCheck = passwordCheckInput.value;

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            setValidatePassword(false);
            return;
        }
        
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

        // try {
        //     const response = await axios.post('http://localhost:3000/api/users/register', json, {
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     });
        //     console.log(response.data);
        //   } catch (error) {
        //     console.error(error);
        // }

        axios
            .post("/api/users/register", json)
            .then((response) => {
                console.log(response);
                alert(`${json.name}님 환영합니다.`)
                console.log(response.data);
                // location.replace("/login");
            })
            .catch((error) => {
                console.error(error);
            });
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
                    < InputForm name = "username" type = "text" />
                    < InputForm name = "password" type = "password" min = {8} max = {20} pattern="[a-z0-9]{1,15}"/>
                    < InputForm name = "PasswordCheck" type = "password" min = {8} max = {20} pattern="[a-z0-9]{1,15}" data-ignore/>
                    {validatePassword? " " : <p>비밀번호가 일치 하지 않습니다.</p>}
                    < InputForm name = "name" type = "text"/>
                    < InputForm name = "email" type = "email"/>
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
