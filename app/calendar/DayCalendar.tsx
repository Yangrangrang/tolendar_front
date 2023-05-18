export default function DayCalendar (props: any){

    const handlerClick = () => {
        console.log("click");
    }

    return (
        <div className="todolist-container h-60 px-3 mt-1 bg-orange-50 rounded-md">
            <div className="flex justify-between py-3" >
                <p>{props.date}</p>
                <button className="px-3 py-1 ml-2 border rounded-full border-orange-400 text-orange-600" onClick={handlerClick}>등록</button>
            </div>

            <ul>
                <li>날짜에 있는 일정리스트</li>
                <li>날짜에 있는 일정리스트</li>
                <li>날짜에 있는 일정리스트</li>
            </ul>
        </div>
    )
}