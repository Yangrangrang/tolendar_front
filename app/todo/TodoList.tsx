import { useContext, useEffect, useState } from "react";
import MenuTodoList from "./MenuTodoList";
import Todo, { TodoData } from "./Todo";
import {User, UserContext} from "../context/userContext";
import axios from "axios";

export default function TodoList () {
    const [inProgressTodoList, setInProgressTodoList] = useState<TodoData[]>([]);

    const userContext = useContext<User | null>(UserContext);

    useEffect(()=> {

        if (userContext?.userId) {
            // console.log('inProgressList');

            // 토큰 불러오기
            const localData = localStorage.getItem("access_token");

            // 진행중
            axios
                .get(`http://localhost:3000/api/todo/inProgressList/${userContext?.userId}`, {
                    headers: {
                        Authorization: `Bearer ${localData}`,
                    },
                })
                .then((response) => {
                    setInProgressTodoList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    },[userContext]);

    const handlerClickToRegister = () => {
        location.href = "/todoRegister";
    }

    const handlerClickToTodoList = () => {
        location.href = "/todo";
    }


    return (
    <>
        <div className="todolist-container h-60 px-3 mt-1 bg-orange-50 rounded-md">
            {/* doList */}
            <div className="dolist-container h-48">
                <MenuTodoList todos={inProgressTodoList} length={inProgressTodoList.length}/>
            </div>
        
            {/* doneList */}
            <div className="btn-container flex justify-between">
                <button className="py-2 w-[48%] rounded-full bg-orange-400 text-white" onClick={handlerClickToRegister}>할일 등록</button>
                <button className="py-2 w-[48%] border border-orange-400 rounded-full text-orange-400" onClick={handlerClickToTodoList}>전체리스트 확인</button>
            </div>
        </div>
    </>
    )
 }