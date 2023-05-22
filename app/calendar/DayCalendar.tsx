import { useContext, useEffect, useState } from "react";
import { User, UserContext } from "../context/userContext";
import axios from "axios";
import { IEventCalendar } from "./Calendar";

export default function DayCalendar (props: any){
    // useContext
    const userContext = useContext<User | null>(UserContext);
    const [events, setEvents] = useState<IEventCalendar[]>([]);

    // 이벤트 가져오기
    const serveSideData = async () => {
        const localDate = localStorage.getItem("access_token");

        // 서버에서 데이터 받아오기
        try {
            const response = await axios.get(`/api/calendar/getCalendar/${props.date}`, {
              headers: {
                Authorization: `Bearer ${localDate}`,
              },
            });
        
            console.log(response.data);
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
    },[props.date])

    console.log(events);



    return (
        <div className="todolist-container h-60 px-3 mt-1 bg-orange-50 rounded-md">
            <div className="flex justify-between py-3" >
                <p>{props.date}</p>
            </div>

            <ul>
                {events.map((event , index) => (
                    <li key={event.id}>
                        <span>{index + 1}.</span>{event.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}