import React from 'react';
import {Box, Container} from '@mui/material'

// import event card component
import { SavedEventCard } from '../SavedEventCard';
import { Fullscreen } from '@mui/icons-material';

export const EventsDisplay = ({user, eventsToday, setUserEvents}) => {
    if(!eventsToday){
        return(
            <Container
            sx={{
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <h3>No events found</h3>
        </Container>
        )
    }
    else {
        return (
            <div className='eventstodaycontainer'>
            <Container
            sx={{
                m: 1,
                borderRadius: 1,
            }}
        >   
            <Box 
            sx={{
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1
            }}
            ><h3>Events Happening Today</h3>
            </Box>
            {eventsToday.map((event, index) => 
            <SavedEventCard index={index} event={event} cardId={index} key={index} user={user} userEvents={eventsToday} setUserEvents={setUserEvents} ></SavedEventCard>
            )}
            </Container>
            </div>
        )
    }
}