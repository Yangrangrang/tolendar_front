'use client'
import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";
import DayCalendar from './DayCalendar'

export default function Calendar(props: any) {

  const handleDateClick = (arg: any) => { // bind with an arrow function
    if(!props.onDateClick) {return;}
    props.onDateClick(arg)
  }

  // defaultView="dayGridMonth" 
  return (
    <div className="p-3 border">
      <FullCalendar
        plugins={[ interactionPlugin , dayGridPlugin, timeGridPlugin ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        weekends={false}
        eventClick={() => {
          alert('event')
        }}
        events={[
            { title: 'event 1', date: '2023-05-01' },
            { title: 'event 2', date: '2023-05-02' },
            { title: 'event 3', start: '2023-05-03', end: '2023-05-06' },
        ]}
        height={"500px"}
        dateClick={handleDateClick}
      />
    </div>
  )
}