export default function DayCalendar (props: any){
  return (
    <div className="todolist-container h-60 px-3 mt-1 bg-orange-50 rounded-md">
      <span>{props.date}</span>
      <ul>
        <li>날짜에 있는 일정리스트</li>
        <li>날짜에 있는 일정리스트</li>
        <li>날짜에 있는 일정리스트</li>

      </ul>
    </div>
  )
}