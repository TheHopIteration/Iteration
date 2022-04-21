import React from 'react'
import { EventCard } from './EventCard';

export const EventsContainer = ({ apiEvents, user }) => {
    const numEvents = apiEvents.length;
    return (
        <div className="h-auto bg-neutral-50">
            {apiEvents.length > 0 ?
                <div className="border-b py-0.5 flex justify-around  bg-sky-100 ">
                    <p className='text-md font-medium text-gray-600'>No. of events found: <span className="font-semibold text-cyan-800">{numEvents}</span></p>
                </div>
                :
                <div className="py-0.5 flex justify-around bg-custom-yellow">
                    <p className='font-medium text-md m-2 content-center text-black'>Search to find out what's hopping!</p>
                </div>
            }

            {apiEvents.length > 0 ?
                <div className='p-4 h-[68vh] space-y-2 overflow-y-scroll relative'>
                    {apiEvents.map((event, index) => (
                        <EventCard event={event} cardId={index} key={index} user={user} num={index + 1}></EventCard>
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
        </div>

    )
}
