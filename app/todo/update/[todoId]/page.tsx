import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import UpdateTodo from "./UpdateTodo";

export default function UpdateTodoByTodoId ({ params: { todoId } }: Params) {
    return (
        <UpdateTodo todoId={todoId}/>
    )
}