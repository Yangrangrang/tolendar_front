'use client'
import InputForm from "../signup/InputForm";
import axios from "axios";

export default function LoginPage () {

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {

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

        axios
            .post("/api/auth/login", json)
            .then((response) => {
                console.log(response.data);
                // 로컬스토리지에 토큰 저장
                const json = JSON.stringify(response.data);
                localStorage.setItem("token",json);
                location.replace("/");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (

    <div className="relative flex flex-col justify-center min-h-[85%] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-400 underline">
                    Login
                </h1>
                <form action={"/api/auth/login"} method="post" className="mt-6" onSubmit={(e) => {
                    e.preventDefault();
                    console.log("test");
                    handleSubmit(e);
                }}>
                    < InputForm name = "username" type="text" title="ID" />
                    < InputForm name = "password" type="password" title="password" />
                    <a
                        href="#"
                        className="text-s text-orange-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-orange-300 focus:outline-none focus:bg-orange-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-s font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-orange-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
