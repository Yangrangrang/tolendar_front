'use client'
import React, { Component, useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid";
import DayCalendar from './DayCalendar'
import { DateSelectArg } from '@fullcalendar/core'
import { useDisclosure } from '../hook/useDisclosure'
import ModalInfosEventCalendar, { updateEventCalendar } from './ModalInfosEventCalendar/page'
import { User, UserContext } from '../context/userContext'
import axios from 'axios'
import { title } from 'process'
import googleCalendarPlugin from '@fullcalendar/google-calendar';

// 받아올 캘린더 데이터 인터페이스
export interface IEventCalendar {
    id: string;
    title: string;
    end: string;
    start: string;
    user: string;
}

// props
type CalendarProps = {
    eventCalendar? : IEventCalendar[];
    eventFunction : (args: any) => void;
}

export default function Calendar(props : CalendarProps) {
    // useContext
    const userContext = useContext<User | null>(UserContext);
    // 이벤트 정보 저장
    const [eventInfos, setEventInfos] = useState();
    // 이벤트 수정 모드 여부
    const [isEditCard, setIsEditCard] = useState<boolean>(false);
    // 서버에서 이벤트 받아오기
    const [events, setEvents] = useState<IEventCalendar[]>([]);
    // 커스텀 훅 (모달의 열림/ 닫힘)
    const modalInfosEvent = useDisclosure(false);


    const handleDateClick = (arg: any) => { // bind with an arrow function
        props.eventFunction(arg)
    }

    const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
        console.log(selectInfo);
        setIsEditCard(false);
        setEventInfos(selectInfo);
        modalInfosEvent.handleOpen();
    }

    const handleEditEventSelectAndOpenModal = (clickInfo : any) =>{
        console.log(clickInfo);
        setIsEditCard(true);
        setEventInfos(clickInfo);
        modalInfosEvent.handleOpen();
    }

    const handleUpdateEventSelect = async (changeInfo : any) => {
        try {
            if (userContext?.userId){ 
            const eventCalendar = await updateEventCalendar({
                eventCalendar: {
                    userId : userContext?.userId,
                    title: changeInfo.event.title,
                    start: changeInfo.event.startStr,
                    end: changeInfo.event.endStr,
                    id : changeInfo.event.id,
                },
                
            });
            console.log(eventCalendar);
            }
            console.log(changeInfo);
        } catch (e) {
            console.log(e);
        }
    }

    // 초기 이벤트 설정
    const serveSideData = async () => {
        const localDate = localStorage.getItem("access_token");

        // 서버에서 데이터 받아오기
        try {
            const response = await axios.get(`/api/calendar/getList/${userContext?.userId}`, {
              headers: {
                Authorization: `Bearer ${localDate}`,
              },
            });
        
            // console.log(response.data);
            setEvents(response.data);
        } catch (e) {
        console.log(e);
        }
    }
    // console.log(events);

    useEffect(()=> {
        if (userContext?.userId){
            serveSideData();
        }
    },[userContext])
    // console.log(process.env.GOOGLE_API);
    const apiKey = process.env.GOOGLE_API;

    return (
        <div className="p-3 border">

            {/* 모달 */}
            <ModalInfosEventCalendar
                open={modalInfosEvent.isOpen}
                handleClose={modalInfosEvent.handleClose}
                eventInfos={eventInfos}
                isEditCard={isEditCard}
            />    

        <FullCalendar
            // defaultView="dayGridMonth" 
            locale="ko"
            plugins={[ interactionPlugin , dayGridPlugin, timeGridPlugin ,googleCalendarPlugin]}  // 플러그인 배열 전달
            // googleCalendarApiKey={process.env.GOOGLE_API}
            initialView="dayGridMonth"                                       // 초기 뷰 day로 설정 (딱히 설정 안해도 달은 기본설정)
            headerToolbar={{                                                 // 헤더 도구 모음
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            weekends={true}                                                 // 주말 표시 여부 설정
            eventClick={handleEditEventSelectAndOpenModal}                                        // 일정 클릭 시 실행 이벤트 핸들러
            eventChange={handleUpdateEventSelect}                                          // 일정 변경 시 실행 이벤트 핸들러
            // initialEvents={events}                                        // 초기 표시할 일정 데이터 설정
            events={events}
            // events={[{id : '1', title: ' test', start : "2023-05-21T12:00:00.000Z", end: '2023-05-23T22:00:00.000Z'}]}x
            dayMaxEvents={true}
            selectable = {true}                                             // 드래그 선택 (Date Range: 2023-05-15  -  2023-05-20)
            editable={true}
            // selectOverlap = {selectEvent}
            height={"500px"}                                                // 높이 설정
            select={handleAddEventSelectAndOpenModal}                                       // 일정 선택 시 실행 이벤트 핸들러 함수
            dateClick={handleDateClick}
            buttonText={{
                today: "오늘",
                month: "월별",
                week: "주별",
                day: "일별",
            }}
            // eventSources={[{googleCalendarId : 'ko.south_korea#holiday@group.v.calendar.google.com' , className : 'ko_event' }]}
            // eventTextColor={'#FFF'}
            // eventColor={'#F2921D'}
        />
        </div>
    )
}