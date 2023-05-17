'use client'
import axios from "axios";
import Todo, { TodoData } from "../todolist/Todo";
import TodoList from "../todolist/TodoList";
import { useContext , useState , useEffect } from "react";
import { UserContext } from "../context/userContext";
import MenuTodoList from "./MenuTodoList";

type UserContextType = { 
    userId: string | null; 
    userName: string | null 
} | null;

export default function MenuTodo () {
    const [inProgressTodoList, setInProgressTodoList] = useState<TodoData[]>([]);
    const [completedTodoList, setCompletedTodoList] = useState([]);
    const [pastTodoList, setPastTodoList] = useState([]);

    const userContext = useContext<UserContextType>(UserContext);

    
    useEffect(() => {
        
        // 토큰 불러오기
        const localData = localStorage.getItem("access_token");
    
        // 서버에서 데이터 받아오기
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
            
    },[userContext?.userId]);

    return (
        <div className="mt-2">
            <MenuTodoList todos={pastTodoList} title="지난 Todo" length={pastTodoList.length} color="text-rose-600"/>
            <MenuTodoList todos={inProgressTodoList} title="예정 Todo" length={inProgressTodoList.length}/>
            <MenuTodoList todos={completedTodoList} title="완료 Todo" length={completedTodoList.length}/>

            <div className="btn-container flex justify-between mt-3">
                    <button className="py-2 w-[100%] rounded-full bg-orange-400 text-white"><a href="/todoRegister">할일 등록</a></button>
            </div>
        </div>
    )
}