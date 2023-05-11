import Todo from "./Todo";

export default function TodoList () {

  return (
   <>
     <div className="todolist-container h-60 px-3 mt-1 bg-orange-50 rounded-md">
       {/* doList */}
       <div className="dolist-container h-48">
         <Todo />
         <Todo />
         <Todo />
         <Todo />
         <Todo />
       </div>
 
       {/* doneList */}
       <div className="btn-container flex justify-between">
        <button className="py-2 w-[48%] rounded-full bg-orange-400 text-white"><a href="#">할일 등록</a></button>
        <button className="py-2 w-[48%] border border-orange-400 rounded-full text-orange-400 "><a href="#">전체리스트 확인</a></button>
       </div>
     </div>
   </>
  )
 }