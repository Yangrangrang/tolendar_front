'use client'
import { useState ,useRef, useEffect, useContext } from "react";
import InputForm from "../signup/InputForm";
import { UserContext } from "../context/userContext";
import axios from "axios";



export default function RegisterTodo () {

    const userContext = useContext(UserContext);

    const [isDayAlarm , setIsDayAlarm] = useState(false);
    const [isVertDayAlarm, setIsVertDayAlarm] = useState(false);

    const dayAlarmRef = useRef<HTMLInputElement>(null);
    const vertDayAlarmRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        // 초기 값 설정 (DOM 요소의 checked 속성값을 읽어와서 상태 설정)
        if (dayAlarmRef.current) {
          setIsDayAlarm(dayAlarmRef.current.checked);
        }
        if (vertDayAlarmRef.current) {
          setIsVertDayAlarm(vertDayAlarmRef.current.checked);
        }
      }, []);

    // checkbox change event
    const handleDayAlarmChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setIsDayAlarm(e.target.checked);
    };
    
      const handleVertDayAlarmChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setIsVertDayAlarm(e.target.checked);
    };

    // submit event handler
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 폼 데이터 수집
        const formData = new FormData(e.currentTarget);
        console.log(e.currentTarget);
    
        interface FormData {
            [key: string] : string | File;
        }
        
        // FormData 객체에 저장된 값을 출력
        let json : FormData = {};

        for (let [key, value] of formData.entries()) {
          console.log(key, value);
          json[key] = value;
        }

        const localData = localStorage.getItem("access_token");
        console.log(json);

        axios
            .post(`/api/todo/register/${userContext?.userId}`, json, {
                headers: {
                    Authorization: `Bearer ${localData}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                location.href="/todo"
            })
            .catch((error) => {
                alert("입력값을 확인해 주세요.")
                console.error(error);
            });

    }

    // date값 지난 날짜는 선택이 되지 않게
    const today =new Date().toISOString().split('T')[0];

    return (
        <div className="relative flex flex-col justify-center min-h-[85%] overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-orange-400 underline">
                   To-do
                </h1>
                <form action={`/api/todo/register/${userContext?.userId}`} method="post" className="mt-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    <div className="mt-6">
                        
                        <InputForm name="content" type= "text" min={1} max={50} title="할 일"/>
                        <InputForm name="todoDate" type= "date" min={today} title="완료 예정일"/>

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