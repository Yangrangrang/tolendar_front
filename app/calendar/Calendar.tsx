'use client'
import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";

export default class Calendar extends Component {

  handleDateClick = (arg: any) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  render() {
      return (
        <div className="w-2/5 min-w-[60%] h-[50px] p-3">
          <FullCalendar
            // defaultView="dayGridMonth" 
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
            height={"480px"}
            dateClick={this.handleDateClick}
          />
        </div>
      );
  }
}