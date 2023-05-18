'use client'
import { useState ,useRef, useEffect, useContext } from "react";
import InputForm from "@/app/signup/InputForm";
import { UserContext } from "@/app/context/userContext"; 
import axios from "axios";

type UpdateTodoProps = {
    todoId : string;
}

export default function UpdateTodo ( props : UpdateTodoProps) {
    // console.log(props.todoId);

    const userContext = useContext(UserContext);

    const [isDayAlarm , setIsDayAlarm] = useState<boolean>(false);
    const [isVertDayAlarm, setIsVertDayAlarm] = useState<boolean>(false);
    const [formContent, setFormContent] = useState("");
    const [formDate, setFormDate] = useState("");

    let dayAlarm = "";
    let vertDayAlarm ="";
    
    const dayAlarmRef = useRef<HTMLInputElement>(null);
    const vertDayAlarmRef = useRef<HTMLInputElement>(null);

    
    useEffect(() => {
        // 토큰 가져오기
        const localData = localStorage.getItem("access_token");
        
        // 서버에서 데이터 가져오기
        try {
            axios
                .get(`/api/todo/todo/${props.todoId}`, {
                    headers : {
                        Authorization: `Bearer ${localData}`,
                    },
                })
                .then((response)=>{
                    console.log(response.data);
                    // 가져온 데이터로 상태 업데이트
                    setFormContent(response.data.content);
                    setFormDate(response.data.todoDate);
                    dayAlarm = response.data.dayAgoAlarm;
                    vertDayAlarm = response.data.veryDayAlarm;
                    // checkbox value
                    if (dayAlarm === "on"){
                        setIsDayAlarm(true);
                    }
                    if (vertDayAlarm === "on"){
                        setIsVertDayAlarm(true);
                    }
                    // setIsDayAlarm(response.data.isDayAlarm);
                    // setIsVertDayAlarm(response.data.isVertDayAlarm);
                })
        

        } catch (e){
            console.log(e);
        }
        // console.log(isDayAlarm);

    }, []);

    // checkbox change event
    const handleDayAlarmChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setIsDayAlarm(e.target.checked);
        console.log(e.target.checked);
        console.log(isDayAlarm);
    };

    const handleVertDayAlarmChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setIsVertDayAlarm(e.target.checked);
        console.log(e.target.checked);
        console.log(isVertDayAlarm);
    };

    // submit event handler
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 토큰 가져오기
        const localData = localStorage.getItem("access_token");

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
            .post(`/api/todo/update/${userContext?.userId}/${props.todoId}`, json, {
                headers: {
                    Authorization: `Bearer ${localData}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                // location.href="/todo"
            })
            .catch((error) => {
                alert("입력값을 확인해 주세요.")
                console.error(error);
            });

    }

    // date값 지난 날짜는 선택이 되지 않게
    const today =new Date().toISOString().split('T')[0];
    const beforeDay = formDate.split('T')[0];

    return (
        <div className="relative flex flex-col justify-center min-h-[85%] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <div className="border rounded-md text-center p-3 mb-5">
                    <p className="text-sm font-semibold text-gray-800 my-2 ">이전 할일 내용 : {formContent}</p>
                    <p className="text-sm font-semibold text-gray-800 my-2 ">이전 완료 예정일 : {beforeDay}</p>
                </div>
                <h1 className="text-3xl font-semibold text-center text-orange-400 underline pt-3">
                   To-do 수정
                </h1>
                <form action={`/api/todo/register/${userContext?.userId}`} method="post" className="mt-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    <div className="mt-6">
                        

                        <InputForm name="content" type= "text" min={1} max={50} title="할 일"/>
                        <InputForm name="todoDate" type= "date" min={today} title="변경 할 완료 예정일"/>

                        <p className="text-sm font-semibold text-gray-800 mb-2">알람</p>
                        <ul className="items-center w-full text-sm font-medium text-stone-900 bg-white border border-orange-200 rounded-lg sm:flex dark:bg-orange-300 dark:border-orange-300 dark:text-stone mb-6">
                            <li className="w-full border-b border-orange-200 sm:border-b-0 sm:border-r dark:border-orange-500">
                                <div className="flex items-center pl-3">
                                    <input ref={dayAlarmRef} id="dayAgoAlarm" name="dayAgoAlarm" type="checkbox" checked={isDayAlarm} onChange={handleDayAlarmChange} className="w-4 h-4 text-orange-600 bg-orange-100 border-orange-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-orange-700 dark:focus:ring-offset-orange-700 focus:ring-2 dark:bg-orange-600 dark:border-orange-500" />
                                    <label htmlFor="dayAgoAlarm" className="w-full py-3 ml-2 text-sm font-medium text-stone-900 dark:text-stone-800">하루전 알람</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-orange-200 sm:border-b-0 sm:border-r dark:border-orange-500">
                                <div className="flex items-center pl-3">
                                    <input ref={vertDayAlarmRef} id="veryDayAlarm" name="veryDayAlarm" type="checkbox" checked={isVertDayAlarm} onChange={handleVertDayAlarmChange} className="w-4 h-4 text-orange-600 bg-orange-100 border-orange-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-orange-700 dark:focus:ring-offset-orange-700 focus:ring-2 dark:bg-orange-600 dark:border-orange-500" />
                                    <label htmlFor="veryDayAlarm" className="w-full py-3 ml-2 text-sm font-medium text-stone-900 dark:text-stone-800">당일 알람</label>
                                </div>
                            </li>
                        </ul>
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-orange-300 focus:outline-none focus:bg-orange-500">
                            등록 하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}