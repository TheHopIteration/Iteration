import React, { useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './schedulecard.css'
import {Container, Button, Box, Stack} from '@mui/material'

// import EventsDisplay
import { EventsDisplay } from './EventsDisplay'

export const ScheduleCard = ({ user, userEvents, setUserEvents }) => {


    const [eventsToday, setEvents] = React.useState([])

    // function to convert timezones
    const timeConverter = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString("en-US", { timeZone: "America/Los_Angeles", timeZoneName: "short" })
            ;
    }



    // handle date click on calendar
    // will filter out a list of pulled dates 
    const pickDate = (val) => {
        setEvents()
        // when selecting a date, build a new array of events with dates matching selected date
        for (let i = 0; i < userEvents.length; i++){
            const eveArr = [];
            if (timeConverter(val.toISOString()).slice(0,8) === timeConverter(userEvents[i].start_time).slice(0,8)){
                userEvents[i].start_time=timeConverter(userEvents[i].start_time)
                eveArr.push(userEvents[i])
                setEvents([...eveArr])
            }
        }
    }

    // render the EventsDisplay on load
    useEffect(() => {
        pickDate(new Date())
    }, []);

    return (


        <div className="flex items-center bg-gray-100 justify-center h-full">
           <Box
                className="calendarcontainer"
                sx = {
                    {p:2}
                }
                >
                <Calendar onChange={pickDate}/>
                <EventsDisplay user={user} eventsToday={eventsToday} setUserEvents={setUserEvents} timeConverter={timeConverter} />
            </Box>
        </div>
    )
}
