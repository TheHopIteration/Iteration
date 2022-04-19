import React, { useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './schedulecard.css'
import {Container, Button, Box, Stack} from '@mui/material'

// import EventsDisplay
import { EventsDisplay } from './EventsDisplay'

export const ScheduleCard = ({ user, userEvents, setUserEvents }) => {


    const [eventsToday, setEvents] = React.useState([])
    const [chosenDate, setDate] = React.useState('')
    // function to convert timezones
    const timeConverterCalendar = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString("en-US", { timeZone: "America/Los_Angeles", timeZoneName: "short" })
    }



    // handle date click on calendar
    // will filter out a list of pulled dates 
    const pickDate = (val) => {
        setEvents()
        console.log('Running pickDate')
        // when selecting a date, build a new array of events with dates matching selected date
        // convert the userevent times in our event router thing
        const eveArr = [];
        for (let i = 0; i < userEvents.length; i++){
            if (timeConverterCalendar(val.toISOString()).slice(0,8) === userEvents[i].start_time.slice(0,8)){
                // userEvents[i].start_time=timeConverter(userEvents[i].start_time)
                eveArr.push(userEvents[i])
            }
        }
        setEvents([...eveArr])
        setDate(timeConverterCalendar(val.toISOString()).slice(0,8))
    }

    // render the EventsDisplay on load
    useEffect(() => {
        pickDate(new Date())
    }, [])
    
    return (
           <Container
                className="calendarcontainer"
                sx = {
                    {p:2}
                }
                >
                <Calendar onChange={pickDate}/>
                <EventsDisplay user={user} eventsToday={eventsToday} setUserEvents={setUserEvents} chosenDate={chosenDate} />
            </Container>

    )
}
