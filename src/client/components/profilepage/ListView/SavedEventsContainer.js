import React from 'react'
import { SavedEventCard } from '../SavedEventCard';
import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';

//savedEventsContainer holds individual event cards that display all event information
//rendering the event cards fetched from the database


export const SavedEventsContainer = ({ user, userEvents, setUserEvents }) => {
    const [eventRoute, setEventRoute] = useState([]);
    const [link, setLink] = useState('');

    useEffect(() => {
        console.log(eventRoute);
        let waypoints = '';
        if (eventRoute.length === 1) {
            setLink(`https://www.google.com/maps/dir/?api=1&origin=${user.home_location.replace(/ /g, "+")}&destination=${eventRoute[0].latitude},${eventRoute[0].longitude}&travelmode=driving`);
        }
        if (eventRoute.length > 1) {
            eventRoute.sort((a, b) => {
                return a.start_time.localeCompare(b.start_time);
            });
            eventRoute.forEach((element, index) => {
                if (index > 0) {
                    waypoints = waypoints + `${element.address.replace(/ /g, "+")}|`
                };
            });
            setLink(`https://www.google.com/maps/dir/?api=1&origin=${user.home_location.replace(/ /g, "+")}&destination=${eventRoute[0].latitude},${eventRoute[0].longitude}&waypoints=${waypoints}&travelmode=driving`);
            console.log(eventRoute);
        }
        console.log(link);
    }, [eventRoute]);

    return (
        <div className="flex w-full justify-center">
            <div className="p-6 rounded-lg mb-12 w-full bg-gray-100 justify-center items-center text-center">
                {JSON.stringify(userEvents) !== JSON.stringify({}) ?
                    <h2 className="text-gray-700 mt-3 text-2xl leading-tight font-bold mb-4 flex-center">Saved Events</h2>
                    :
                    <h4 className="text-gray-700 mt-3 text-xl leading-tight font-medium mb-4 flex-center">Please log in to see events</h4>
                }
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
                <Button
                    target="_blank"
                    href={link}
                >
                    Routes
                </Button>

                {/* 
                { userEvents.map((event, index) => 
                    <SavedEventCard index={index} event={event} cardId={index} key={index} user={user} userEvents={userEvents} setUserEvents={setUserEvents}></SavedEventCard>
                )} */}
            </div>
        </div>
    )
}
