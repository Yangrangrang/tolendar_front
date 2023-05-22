'use client'
import Calendar from "./Calendar";
import styled from "@emotion/styled";
import DayCalendar from "./DayCalendar";
import { useState } from "react";
import dayjs from "dayjs";
import { cookies } from "next/dist/client/components/headers";
import { Coming_Soon } from "next/font/google";

// 캘린더 스타일 적용
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
  .fc .fc-today-button  {
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
  .fc .fc-today-button:hover {
    background-color: rgb(234 88 12);
  }
  .fc .fc-today-button:disabled {
    background-color: rgb(253 186 116);
  }
`

export default function CalendarPage() {

    // 오늘 날짜로 기본 설정
    const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    console.log(date)

    const onDateClick = (args: any) => {
        console.log(args)
        console.log(args.dateStr);
        setDate(args.dateStr)
    }

    return (
        <>
        <StyleWrapper>
            <Calendar eventFunction={onDateClick}/>
        </StyleWrapper>
        {/* 일정리스트 */}
        <DayCalendar date={date}/>
        </>
    )
}
