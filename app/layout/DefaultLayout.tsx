'use client'
import React from 'react'
import Calendar from '../calendar/Calendar'
import styled from "@emotion/styled";

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

export default function DefaultLayout () {
  return (
    <>
      < StyleWrapper>
        <Calendar />
      </StyleWrapper>
      {/* todoList Component */}
    </>
  )

}