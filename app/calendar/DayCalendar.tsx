export default function DayCalendar (props: any){

    const handlerClick = () => {
        console.log("click");
    }


    return (
        <div className="todolist-container h-60 px-3 mt-1 bg-orange-50 rounded-md">
            <div className="flex justify-between py-3" >
                <p>{props.date}</p>
                <button onClick={handlerClick} className="px-2">+</button>
            </div>

            <ul>
                <li>날짜에 있는 일정리스트</li>
                <li>날짜에 있는 일정리스트</li>
                <li>날짜에 있는 일정리스트</li>
            </ul>
        </div>
    )
}