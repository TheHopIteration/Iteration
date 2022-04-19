import React from 'react'
<<<<<<< HEAD:src/client/components/profilepage/SavedEventsContainer.js
import { SavedEventCard } from './SavedEventCard';
import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
=======
import { SavedEventCard } from '../SavedEventCard';
import { useState, useEffect } from 'react';
>>>>>>> f6ab0f33d6ccc99570bbc16a15bc9bd9ce8bcd77:src/client/components/profilepage/ListView/SavedEventsContainer.js

//savedEventsContainer holds individual event cards that display all event information
//rendering the event cards fetched from the database


export const SavedEventsContainer = ({ user, userEvents, setUserEvents }) => {
<<<<<<< HEAD:src/client/components/profilepage/SavedEventsContainer.js
    const [eventRoute, setEventRoute] = useState([]);
    let link;
    useEffect(() => {
        console.log(eventRoute);
        if (eventRoute.length !== 0) {
            link = `https://www.google.com/maps/dir/?api=1&origin=37.7811,-122.4703&destination=${eventRoute[0].latitude},${eventRoute[0].longitude}&travelmode=driving`;
            console.log(link);
        }
    }, [eventRoute]);

=======
    console.log('Rendering events container')
>>>>>>> f6ab0f33d6ccc99570bbc16a15bc9bd9ce8bcd77:src/client/components/profilepage/ListView/SavedEventsContainer.js
    return (
        <div className="flex w-full justify-center">
            <div className="p-6 rounded-lg mb-12 w-full bg-gray-100 justify-center items-center text-center">
                {JSON.stringify(userEvents) !== JSON.stringify({}) ?
                    <h2 className="text-gray-700 mt-3 text-2xl leading-tight font-bold mb-4 flex-center">Saved Events</h2>
                    :
                    <h4 className="text-gray-700 mt-3 text-xl leading-tight font-medium mb-4 flex-center">Please log in to see events</h4>
                }
<<<<<<< HEAD:src/client/components/profilepage/SavedEventsContainer.js
                {JSON.stringify(userEvents) !== JSON.stringify({}) ? userEvents.map((event, index) => (
                    <SavedEventCard
                        index={index}
                        event={event}
                        cardId={index}
                        key={index}
                        user={user}
                        userEvents={userEvents}
                        eventRoute={eventRoute}
                        setUserEvents={setUserEvents}
                        setEventRoute={setEventRoute}
                    >
                    </SavedEventCard>
                )) : <div></div>
                }
                <a href={link} target="_blank">
                    <Button
                    >
                        Routes
                    </Button>
                </a>

=======
                { userEvents.map((event, index) => 
                    <SavedEventCard index={index} event={event} cardId={index} key={index} user={user} userEvents={userEvents} setUserEvents={setUserEvents}></SavedEventCard>
                )}
>>>>>>> f6ab0f33d6ccc99570bbc16a15bc9bd9ce8bcd77:src/client/components/profilepage/ListView/SavedEventsContainer.js
            </div>
        </div>
    )
}
