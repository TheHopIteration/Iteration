import React, { useState } from 'react'
import { EventCard } from './EventCard';
import { Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';

export const EventsContainer = ({ apiEvents, user }) => {
    const numEvents = apiEvents.length;
    const [saveEventNotification, setSaveEventNotification] = useState(false);

    const handleClose = () => {
        setSaveEventNotification(false);
    };

    return (
        <div className="h-auto bg-neutral-50">
            {apiEvents.length > 0 ?
                <div className="border-b py-0.5 flex justify-around  bg-white">
                    <p className='text-md font-medium text-gray-600'>No. of events found: <span className="font-semibold text-black">{numEvents}</span></p>
                </div>
                :
                <div className="py-0.5 flex justify-around bg-custom-yellow">
                    <p className='font-medium text-md m-2 content-center text-black'>Search to find out what's hoppening!</p>
                </div>
            }

            {apiEvents.length > 0 ?
                <div className='p-4 h-[68vh] space-y-2 overflow-y-scroll relative'>
                    {apiEvents.map((event, index) => (
                        <EventCard event={event} cardId={index} key={index} user={user} num={index + 1} setSaveEventNotification={setSaveEventNotification}></EventCard>
                    ))
                    }
                </div>
                :

                // pl-16 pt-10 h-[70vh] w-85 bg-neutral-50
                <div className='flex items-center justify-center'>
                    <a>
                        <img
                            className="h-[30vh]"
                            src="https://c.tenor.com/dpA4H0yTPooAAAAM/bunny-running.gif"
                            id="bunny"
                            alt="" />
                    </a>
                </div>
            }
            <Snackbar
                open={saveEventNotification}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Event Saved!"
                TransitionComponent={Slide}
                sx={{
                    "& .MuiSnackbarContent-root": { backgroundColor: "#eeaf61" }
                }}
            />
        </div>

    )
}
