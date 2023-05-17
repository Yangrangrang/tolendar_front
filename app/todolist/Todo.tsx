"use client"

import { useState } from "react";

export type TodoData = {
  isDone : boolean,
  content : string,
  todoDate : string,
  color? : string,
}

export default function Todo (props : TodoData){
  const [ isChecked, setIsChecked ]= useState(props.isDone);

  const handlerCheckBoxChange = () => {
    setIsChecked(!isChecked);
    // 서버에 데이터 전송
    try {
      const updateDate = { isDone : isChecked};
    } catch (e) {
      console.log(e);
    }
  }


  const today = props.todoDate ? props.todoDate.toString().split('T')[0] : '';

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
      <span className={props.color}>{today}</span>
    </div>
  )
}