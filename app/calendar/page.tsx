'use client'
import Header from "../Header";
import calendar from "./Calendar";
import Calendar from "./Calendar";
import styled from "@emotion/styled";
import DayCalendar from "./DayCalendar";
import { useState } from "react";

export const StyleWrapper = styled.div`
  .fc-toolbar-title {
    font-size: 18px;
  }
  .fc-button-group button {
    padding : 0.3em 0.4em;
    font-size : 14px;
    background-color: rgb(251 146 60);
    border : none;
  }
  .fc-today-button  {
    padding : 0.3em 0.4em;
    font-size : 14px;
    background-color: rgb(251 146 60);
    border : none;
  }
  .fc-button-group button:hover {
    background-color: rgb(234 88 12);
  }
  .fc-button-group button:active {
    background-color: rgb(234 88 12);
  }
  .fc-today-button:hover {
    background-color: rgb(234 88 12);
  }
  .fc-today-button:disabled {
    background-color: rgb(253 186 116);
  }
`

export default function CalendarPage() {
  function dateFormat(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day;
  }

  const [date, setDate] = useState(dateFormat(new Date()));

  const onDateClick = (args: any) => {
    console.log(args)
    setDate(args.dateStr)
  }

  return (
    <>
      < StyleWrapper>
        <Calendar onDateClick={onDateClick}/>
      </StyleWrapper>
      {/* 일정리스트 */}
      <DayCalendar date={date}/>
    </>
  )
}
