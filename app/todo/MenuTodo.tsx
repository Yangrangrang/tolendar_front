'use client'
import axios from "axios";
import Todo, { TodoData } from "./Todo";
import TodoList from "./TodoList";
import { useContext , useState , useEffect } from "react";
import {User, UserContext} from "../context/userContext";
import MenuTodoList from "./MenuTodoList";

// export type UserContextType = {
//     userId: string | null;
//     userName: string | null
// } | null;

export default function MenuTodo () {
    const [inProgressTodoList, setInProgressTodoList] = useState<TodoData[]>([]);
    const [completedTodoList, setCompletedTodoList] = useState([]);
    const [pastTodoList, setPastTodoList] = useState([]);

    const userContext = useContext<User | null>(UserContext);

    useEffect(() => {

        // console.log('userContext=',userContext)

        // 토큰 불러오기
        const localData = localStorage.getItem("access_token");
    
        // 진행중
        if (userContext?.userId) {
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

        // 완료
        axios
            .get(`http://localhost:3000/api/todo/completedList/${userContext?.userId}`, {
                headers: {
                    Authorization: `Bearer ${localData}`,
                },
            })
            .then((response) => {
                setCompletedTodoList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        // 지난
        axios
            .get(`http://localhost:3000/api/todo/pastList/${userContext?.userId}`, {
                headers: {
                    Authorization: `Bearer ${localData}`,
                },
            })
            .then((response) => {
                setPastTodoList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        }
            
    },[userContext]);

    return (
        <div className="mt-2">
            <MenuTodoList todos={pastTodoList} title="지난 Todo" length={pastTodoList.length} color="text-rose-600" text="더보기"/>
            <MenuTodoList todos={inProgressTodoList} title="예정 Todo" length={inProgressTodoList.length} text="더보기"/>
            <MenuTodoList todos={completedTodoList} title="완료 Todo" length={completedTodoList.length} text="더보기"/>

            <div className="btn-container flex justify-between mt-3">
                <button className="py-2 w-[100%] rounded-full bg-orange-400 text-white"><a href="/todoRegister">할일 등록</a></button>
            </div>
        </div>
    )
}