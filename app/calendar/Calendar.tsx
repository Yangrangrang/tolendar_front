'use client'
import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";
import DayCalendar from './DayCalendar'
import { DateSelectArg } from '@fullcalendar/core'

export default function Calendar(props: any) {

    const handleDateClick = (arg: any) => { // bind with an arrow function
        if(!props.onDateClick) {return;}
        props.onDateClick(arg)
    }

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        const startDate = selectInfo.startStr; // 클릭한 날짜의 시작일
        const endDate = selectInfo.endStr; // 클릭한 날짜의 종료일 (일정의 경우에는 동일한 날짜)

        // 여기에 선택한 날짜에 대한 일정 등록 로직을 작성
        // 서버로 요청을 보내거나 상태를 업데이트하고 등등...

        console.log('Selected Date Range:', startDate, ' - ', endDate);
    }

    return (
        <div className="p-3 border">
        <FullCalendar
            // defaultView="dayGridMonth" 
            plugins={[ interactionPlugin , dayGridPlugin, timeGridPlugin ]}
            headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            weekends={true}
            eventClick={() => {
            alert('event')
            }}
            events={[
                { title: 'event 1', date: '2023-05-01' },
                { title: 'event 2', date: '2023-05-02' },
                { title: 'event 3', start: '2023-05-03', end: '2023-05-06' },
            ]}
            selectable = {true}
            // selectOverlap = {selectEvent}
            height={"500px"}
            select={handleDateSelect}
            dateClick={handleDateClick}
        />
        </div>
    )
}