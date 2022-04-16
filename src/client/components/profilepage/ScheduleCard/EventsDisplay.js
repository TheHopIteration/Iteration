import React from 'react';
import {Box} from '@mui/material'

// import event card component
import { SavedEventCard } from '../SavedEventCard';

export const EventsDisplay = ({user, eventsToday, setUserEvents, timeConverter}) => {
    console.log('eventsToday: ', eventsToday)
    if(!eventsToday){
        return(
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                maxWidth: 1000,
                borderRadius: 1
            }}
        >
            <h3>No events found</h3>
        </Box>
        )
    }
    else {
        return (
            <div className='eventstodaycontainer'>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 1,
                m: 1,
                borderRadius: 1
            }}
        >
            {eventsToday.map((event, index) => 
            <SavedEventCard index={index} event={event} cardId={index} key={index} user={user} userEvents={eventsToday} setUserEvents={setUserEvents} timeConverter={timeConverter}></SavedEventCard>
            )}
            </Box>
            </div>
        )
    }
}