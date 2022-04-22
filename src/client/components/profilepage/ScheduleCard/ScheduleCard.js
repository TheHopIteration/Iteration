import React, { useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './schedulecard.css'
import {Container, Button, Box, Stack} from '@mui/material'

// import events container
import { SavedEventsContainer } from '../ListView/SavedEventsContainer'

export const ScheduleCard = ({ user, userEvents, setUserEvents }) => {


    const [eventsToday, setEvents] = React.useState([])
    const [chosenDate, setDate] = React.useState('')
    // function to convert timezones
    const timeConverterCalendar = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString("en-US", { timeZoneName: "short" })
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
            if (timeConverterCalendar(val.toISOString()).split(',')[0] === userEvents[i].start_time.split(',')[0]){
                // userEvents[i].start_time=timeConverter(userEvents[i].start_time)
                eveArr.push(userEvents[i])
            }
        }
        setEvents([...eveArr])
        setDate(timeConverterCalendar(val.toISOString()).split(',')[0])
    }

    // render the EventsDisplay on load
    useEffect(() => {
        pickDate(new Date())
    }, [])
    
    return (
        <div className="flex w-full justify-center">
        <div className="p-6 rounded-lg mb-12 w-full justify-center items-center text-center">
        <h2 className="text-white  text-2xl leading-tight font-bold mb-4 flex-center">Calendar</h2>
                <Calendar onChange={pickDate}/>
                <SavedEventsContainer user={user} userEvents={eventsToday} setUserEvents={setUserEvents} chosenDate={chosenDate} />
        </div>
        </div>

    )
}
