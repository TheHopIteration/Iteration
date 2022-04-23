import React from 'react';
import SearchIcon from '@mui/icons-material/Search';


export const EventCard = ({ event, cardId, user, num, setSaveEventNotification }) => {

    // converts date string into a local date time format, removes the last 21 characters
    const timeConverter = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString('en-US').slice(0, 21);
    }
    const startTime = timeConverter(event.start);
    const endTime = timeConverter(event.end);

    // extracting values from event to save into database
    const eventid = event.id ? event.id : null;
    const title = event.title ? event.title : null;
    const category = event.category ? event.category : null;
    const labels = event.labels ? event.labels : null;
    const description = event.description ? event.description : null;
    const predicted_attendance = event.phq_attendance ? event.phq_attendance : null;
    const latitude = event.location[1] ? event.location[1] : null;
    const longitude = event.location[0] ? event.location[0] : null;
    const start_time = event.start ? event.start : null;
    const privateVal = event.private ? event.private : null;
    const local_rank = event.local_rank ? event.local_rank : null;
    const rank = event.rank ? event.rank : null;
    const address = event.entities[0] ? event.entities[0].formatted_address.slice(0, -30) : null;
    const distance = event.distance ? event.distance : null;
    const duration = event.duration ? event.duration : null;

    const saveEvent = () => {
        fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: user.userid, // in case we need to get userid from state instead of session
                username: user.username,
                eventid: eventid,
                title: title,
                category: category,
                labels: labels,
                description: description,
                predicted_attendance: predicted_attendance,
                latitude: latitude,
                longitude: longitude,
                start_time: start_time,
                private: privateVal,
                rank: rank,
                local_rank: local_rank,
                address: address
            }),
        }).then(response => response.json())
            .then(data => {
                setSaveEventNotification(true);
                if (data === 'event has been saved') {
                    document.getElementById(`hiddenError${cardId}`).style.display = 'flex';
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="justify-center items-center w-72">
            <div className="rounded-lg shadow-lg bg-white">
                {/* <a href="#!">
                    <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
                </a> */}
                <div className="p-4">
                    <h5 className="text-custom-purple text-xl font-semibold mb-2">{num}. {event.title}</h5>
                    <div className='w-full flex justify-between'>
                        <p className="text-gray-700 text-md font-semibold">
                            Start Time:
                        </p>
                        <p className="text-gray-700">{startTime}</p>
                    </div>
                    <div className='w-full flex justify-between'>
                        <p className="text-gray-700 text-md font-semibold">
                            End Time:
                        </p>
                        <p className="text-gray-700">{endTime}</p>
                    </div>
                    {event.entities[0] ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md font-semibold">
                                Venue:
                            </p>
                            <div className="flex">
                                <div className='px-4'></div>
                                <p className="text-gray-700 text-end">{event.entities[0].name}</p>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {event.entities[0] ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md font-semibold">
                                Address:
                            </p>
                            <div className="flex">
                                <div className='px-2.5'></div>
                                <p className="text-gray-700 text-md text-end">{event.entities[0].formatted_address.slice(0, -30)}</p>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {event.duration ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md font-semibold">
                                Duration:
                            </p>
                            <div className="flex">
                                <div className='px-2.5'></div>
                                <p className="text-gray-700 text-sm text-end">{event.duration}</p>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {event.distance ?
                        <div className='w-full flex justify-between'>
                            <p className="text-gray-700 text-md font-semibold">
                                Distance:
                            </p>
                            <div className="flex">
                                <div className='px-2.5'></div>
                                <p className="text-gray-700 text-sm text-end">{event.distance}</p>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    <div className='flex justify-between mx-4'>
                        {event.description ?
                            <button
                                className="px-4 py-2 mt-4 mr-2 rounded-md text-white bg-custom-yellow font-semibold text-sm flex align-center w-max
                                cursor-pointer hover:bg-gray-400 hover:shadow-lg focus:bg-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out
                                                "data-bs-toggle="collapse" data-bs-target={`#descriptionCollapse${cardId}`} aria-expanded="false" aria-controls={`descriptionCollapse${cardId}`}>
                                Extra Info
                            </button>
                            :
                            <div className="text-white mr-[92px]">.</div>}
                        <SearchIcon className="mt-4 p-0.5 rounded-md shadow-sm text-custom-darkcoral bg-gray-200 items
                        cursor-pointer hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg transition duration-150 ease-in-out"
                            style={{ color: "custom-darkcoral", fontSize: 35 }}
                            onClick={() => window.open(`https://www.google.com/search?q=${event.title}+${startTime}`, '_blank').focus()}
                        />
                        {JSON.stringify(user) === JSON.stringify({}) ?
                            <button type="button" className=" cursor-not-allowed opacity-50 mt-4 text-white inline-block ml-2 px-4 py-2 bg-custom-darkcoral font-medium font-semibold text-sm leading-tight uppercase rounded shadow-md">
                                Save Event</button>
                            :
                            <button type="button" className=" mt-4 inline-block px-4 py-2 bg-custom-darkcoral text-white ml-2 font-medium font-semibold text-sm leading-tight uppercase rounded shadow-md hover:bg-darken hover:shadow-lg focus:bg-custom-darkcoral
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-custom-darkcoral active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => saveEvent()}>
                                Save Event</button>
                        }
                    </div>
                    <div className="collapse" id={`descriptionCollapse${cardId}`}>
                        <div className="block p-6 rounded-lg shadow-lg bg-white">
                            {event.description}
                        </div>
                    </div>
                    <div id={`hiddenError${cardId}`} className="hidden text-center">
                        <p className='text-custom-darkcoral text-center font-semibold text-sm mt-2'>Event has been saved already for user {user.username}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
