import Todo from "../todolist/Todo";
import TodoList from "../todolist/TodoList";

export default function MenuTodo () {
    return (
        <div className="mt-2">
            <div className="todolist-container h-56 px-3 mt-1 bg-orange-50 rounded-md mb-3">
                <div className="flex justify-between py-3">
                    <span>지난 Todo</span>
                    <span><a href="">더보기</a></span>
                </div>
                {/* doList */}
                <div className="dolist-container h-48">
                    <Todo />
                    <Todo />
                    <Todo />
                    <Todo />
                    <Todo />
                </div>
            </div>

            <div className="todolist-container h-56 px-3 mt-1 bg-orange-50 rounded-md mb-3">
                <div className="flex justify-between py-3">
                    <span>진행 Todo</span>
                    <span><a href="">더보기</a></span>
                </div>
                {/* doList */}
                <div className="dolist-container h-48">
                    <Todo />
                    <Todo />
                    <Todo />
                    <Todo />
                    <Todo />
                </div>
            </div>
            
            <div className="todolist-container h-56 px-3 mt-1 bg-orange-50 rounded-md mb-3">
                <div className="flex justify-between py-3">
                    <span>완료 Todo</span>
                    <span><a href="">더보기</a></span>
                </div>
                {/* doList */}
                <div className="dolist-container h-48">
                    <Todo />
                    <Todo />
                    <Todo />
                    <Todo />
                    <Todo />
                </div>
            </div>

            <div className="btn-container flex justify-between mt-3">
                    <button className="py-2 w-[100%] rounded-full bg-orange-400 text-white"><a href="/todoRegister">할일 등록</a></button>
            </div>
        </div>
    )
}