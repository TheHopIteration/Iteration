import React from 'react';
import {Box, Container} from '@mui/material'

// import event card component
import { SavedEventCard } from '../SavedEventCard';
import { Fullscreen } from '@mui/icons-material';

export const EventsDisplay = ({user, eventsToday, setUserEvents, chosenDate}) => {
    if(eventsToday.length === 0){
        return(
            <Container
            sx={{
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <h3>No events found for {chosenDate}</h3>
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
            ><h3>Events Happening {chosenDate}</h3>
            </Box>
            {eventsToday.map((event, index) => 
            <SavedEventCard index={index} event={event} cardId={index} key={index} user={user} userEvents={eventsToday} setUserEvents={setUserEvents} ></SavedEventCard>
            )}
            </Container>
            </div>
        )
    }
}