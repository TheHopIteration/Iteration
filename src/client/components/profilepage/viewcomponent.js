import React, { useEffect, useState } from 'react'
import { ScheduleCard } from './ScheduleCard/ScheduleCard'
import { SavedEventsContainer } from './ListView/SavedEventsContainer'



export const Viewcomponent = ({ user, userEvents, setUserEvents, view }) => {

    const [convertedEvents, setConEve] = useState([])

    // convert timezones of our userevents
    const timeConverter = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString("en-US", { timeZoneName: "short" })
    }

    useEffect(() => {
        console.log('converting userevents')
        for (let i = 0; i < userEvents.length; i++){
            userEvents[i].start_time=timeConverter(userEvents[i].start_time)
        }
        setConEve([...userEvents])
    }, [userEvents])


    if (view === 'list'){
        return (
            <SavedEventsContainer user={user} userEvents={convertedEvents} setUserEvents={setUserEvents} view={view} chosenDate={''}></SavedEventsContainer>
        )
    }
    else {
        return(
            <ScheduleCard user={user} userEvents={convertedEvents} setUserEvents={setUserEvents} view={view} />
        )
    }
}