import { Button, Modal, TextField } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { BackgroundColorRounded, BoxContainer, ListColorsCard, SelectColors } from './styles';
import { CalendarApi } from '@fullcalendar/core';
import axios from 'axios';
import { UserContext } from '@/app/context/userContext';

type IModalInfosEventCalendaryProps = {
    // 모달open 여부
    open: boolean;
    handleClose: () => void;
    eventInfos: any;
    isEditCard: boolean;
}

interface ICreateEventCalendar {
    eventCalendar: {
        userId : string;
        title: string;
        end: string;
        start: string;
        backgroundColor?: string;
        textColor?: string;
        id : string;
    };
}

export const createEventCalendar = (data: ICreateEventCalendar) => {
    // console.log("teset");
    try {
        // console.log(data.eventCalendar);
        const localData = localStorage.getItem("access_token");

        axios
            .post(`/api/calendar/register/${data.eventCalendar.userId}`, data.eventCalendar, {
                headers: {
                    Authorization : `Bearer ${localData}`,
                },
            })
            .then((response)=>{
                console.log(response.data)
            })
            .catch((e)=>{
                console.error(e);
            })
    } catch (e) {
      console.log(e);
    }
};

export const deleteEventCalendar = ( id : any) => {
    console.log("deleteId ",id.id);
    try {
        const localData = localStorage.getItem("access_token");

        axios
            .delete(`/api/calendar/delete/${id.id}`, {
                headers: {
                    Authorization : `Bearer ${localData}`,
                },
            })
            .then((response)=> {
                console.log(response.data);
            })
            .catch((e)=> {
                console.error(e);
            })
    } catch (e){
        console.log(e);
    }
}

export const updateEventCalendar = (data: ICreateEventCalendar) => {
    console.log(data);
    try {
        const localData = localStorage.getItem("access_token");

        axios
            .post(`/api/calendar/update/${data.eventCalendar.id}`, data.eventCalendar,{
                headers: {
                    Authorization : `Bearer ${localData}`,
                },
            })
            .then((response)=> {
                console.log(response.data);
            })
            .catch((e)=> {
                console.error(e);
            })
    } catch (e) {
        console.log(e);
    }
}


export default function ModalInfosEventCalendar (props :IModalInfosEventCalendaryProps){
    // title 상태 변경
    const [title, setTitle] = useState<string>('');
    const userContext = useContext(UserContext);

    useEffect (()=>{
        if (props.isEditCard) {
            setTitle(props.eventInfos.event.title)
        } else {
            setTitle('');
        }
    },[props.isEditCard])

    // addEvent
    const handleAddEvent = async () => {
        // console.log("handlerAdd");
        if (userContext?.userId){
            try {
                const calendarApi : CalendarApi = props.eventInfos.view.calendar;
    
                console.log(props.eventInfos.start);
                const eventCalendar = await createEventCalendar({
                    eventCalendar: {
                        userId : userContext?.userId,
                        title: title,
                        start: props.eventInfos.startStr,
                        end: props.eventInfos.endStr,
                        id : "",
                      },
                });
    
                calendarApi.addEvent({
                    userId : userContext?.userId,
                    title: title,
                    start: props.eventInfos.startStr,
                    end: props.eventInfos.endStr,
                })
            } catch (e) {
                console.log(e);
            } finally {
                // 최종으로 상태 초기화 후 모달 닫기
                setTitle('')
                props.handleClose();
            }
        }
    }

    // deleteEvent
    const handleDeleteEvent = async () => {
        try {
            await deleteEventCalendar({ id: props.eventInfos.event.id });
            props.eventInfos.event.remove();  
        } catch (e) {
            console.log(e);
        } finally {
            setTitle('');
            props.handleClose();
        }
    };

    // updateEvent
    const handleUpdatedEvent = async () => {
        try {
            if (userContext?.userId){
                const calendarApi : CalendarApi = props.eventInfos.view.calendar;

                const eventCalendar = await updateEventCalendar({
                    eventCalendar: {
                        userId : userContext?.userId,
                        title: title,
                        start: props.eventInfos.event.startStr,
                        end: props.eventInfos.event.endStr,
                        id : props.eventInfos.event.id,
                    },
                    
                });

                const currentEvent = calendarApi.getEventById(props.eventInfos.event.id);
                if (currentEvent) {
                    currentEvent.setProp('title', title);
                }
                console.log(currentEvent);
            }
        } catch (e){
            console.log(e);
        } finally {
            setTitle('');
            props.handleClose();
        }
    }

    return (
        <>
        <Modal open={props.open} onClose={props.handleClose}>
            <BoxContainer>
                <TextField label={'일정 등록'} value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />

                {/* <SelectColors>
                {ListColorsCard.map((color, index) => (
                    <BackgroundColorRounded
                    key={index}
                    selected={false}
                    color={color.backgroundColor}
                    // onClick={() => handleSelectCardColor(color)}
                    >
                    <input
                        type="radio"
                        name="cardColor"
                        // checked={color.backgroundColor === cardColor.backgroundColor}
                    />
                    </BackgroundColorRounded>
                ))} */}
                {/* </SelectColors> */}

                {/* <SelectColors> */}
                {/* <div className='my-3'>
                    <input
                        type="checkbox"
                        name="allday"
                        className='mr-2'
                        // value={"종일"}
                        aria-label='종일'
                        />
                    <label id='allday'>종일</label>
                </div> */}
                {/* </SelectColors> */}

                <Button
                variant="contained"
                fullWidth
                style={{backgroundColor:"#FB923C"}}
                onClick={props.isEditCard ? handleUpdatedEvent : handleAddEvent}
                sx={{ marginTop: '0.5rem' }}
                >
                {/* 버튼 이름 */}
                {props.isEditCard ? '수정하기' : '등록하기'}
                </Button>

                {props.isEditCard && (
                <Button variant="contained" style={{backgroundColor:"#FB923C"}} fullWidth sx={{ marginTop: '0.5rem' }} onClick={handleDeleteEvent}>
                    삭제하기
                </Button>
                )}
            </BoxContainer>
        </Modal>
        
        

        </>
    )
}