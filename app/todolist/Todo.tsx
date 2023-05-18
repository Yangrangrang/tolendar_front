"use client"

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {User, UserContext} from "../context/userContext";
import { useRouter } from "next/router";
import Link from "next/link";

export type TodoData = {
  id: number,
  isDone : boolean,
  content : string,
  todoDate : string,
  color? : string,
}

export default function Todo (props : TodoData){
  // console.log(props.id);
  const [ isChecked, setIsChecked ]= useState(props.isDone);
  // console.log(props.isDone);

  const userContext = useContext<User | null>(UserContext);
  // const router = useRouter();
  
  const handlerCheckBoxChange = () => {
    // console.log(props.id);
    
    setIsChecked(!isChecked);
    // 서버에 데이터 전송
    
      try {
        // console.log(isChecked);
        // 토큰 불러오기
        const localData = localStorage.getItem("access_token");
        
        axios
        .post(`http://localhost:3000/api/todo/isDoneTodo/${userContext?.userId}/${props.id}`, 
        { isDone: !isChecked },
        {
          headers: {
            Authorization: `Bearer ${localData}`,
          },
        }
        )
        .then((response) => {
          console.log(response);
          console.log(response.data);
          
        })
        .catch((error) => {
          console.error(error);
        });
        location.href="/todo"
      } catch (e) {
        console.log(e);
      }

    }
    
  // Date값 변경
  const today = props.todoDate ? props.todoDate.toString().split('T')[0] : '';

  // data Update click이벤트
  const handlerUpdateClick = () => {
    console.log("click");
    location.href=`/todo/update/${props.id}`;
  }

  // data Delte click이벤트
  const handlerDeleteClick = () => {
    // console.log("click");

    // 삭제 여부 확인
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) {
      return; // 삭제하지 않을 경우 아무 작업도 하지 않음
    }

    try {
      // 토큰 불러오기
      const localData = localStorage.getItem("access_token");
      
      axios
        .delete(`http://localhost:3000/api/todo/deleteTodo/${userContext?.userId}/${props.id}`, 
        {
          headers: {
            Authorization: `Bearer ${localData}`,
          },
        }
        )
        .then((response) => {
          console.log(response);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      } catch (e) {
        console.log(e);
      }
      location.href="/todo"
  }

  return (
    <div className="do-card flex justify-between pt-2">
      <div>
        <input 
          type="checkbox" 
          className="mr-2 accent-orange-500"
          checked={isChecked}
          onChange={handlerCheckBoxChange}
        />
        <span className={props.color}>{props.content}</span>
      </div>
      <div>
        <span className={props.color}>{today}</span>
        <button className="px-3 py-1 ml-2 border rounded-full border-orange-400 text-orange-600" onClick={handlerUpdateClick}>수정</button>
        <button className="px-3 py-1 ml-2 border rounded-full border-orange-400 text-orange-600" onClick={handlerDeleteClick}>삭제</button>
      </div>
    </div>
  )
}