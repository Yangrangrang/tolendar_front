
'use client'
import { useEffect, useState } from "react";
import Todo, { TodoData } from "./Todo"

type MenuTodoListProps = {
    todos : TodoData[];
    title? : string;
    length : number;
    color? : string;
    text? : string;
    link? : string;
}

export default function MenuTodoList (props : MenuTodoListProps){

    const isTodoList = () => {
        return (
            <div className="dolist-container h-48">
                    {props.todos.slice(0, 4).map((todo: TodoData, index : number) => (
                        <div key={index}>
                            {
                                props.color ? 
                                    <Todo id={todo.id} content={todo.content} todoDate={todo.todoDate} isDone={todo.isDone} color={props.color}/>
                                    : 
                                    <Todo id={todo.id} content={todo.content} todoDate={todo.todoDate} isDone={todo.isDone} />
                            }
                        </div>
                    ))}
            </div>
        )
    }

    return (
        <>
        <div className="todolist-container h-56 px-3 mt-1 bg-orange-50 rounded-md mb-3">
                {props.text ? 
                (<div className="flex justify-between py-3">
                    <span>{props.title}</span>
                    <a href={props.link}>{props.text}</a>
                </div>) : <div className="py-1"></div>}
                {/* doList */}
                {props.length > 0 ? isTodoList() : <div>일정이 없습니다.</div>}
        </div>
        </>
    )
}