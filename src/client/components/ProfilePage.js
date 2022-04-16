import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { SavedEventsContainer } from './profilepage/SavedEventsContainer'
import { ScheduleCard } from './profilepage/ScheduleCard/ScheduleCard'
import { Footer } from './Footer'


export const ProfilePage = ({ user }) => {
  const [userEvents, setUserEvents] = useState([]);

  let backendUrl = new URL("http://localhost:3000/api/events");
  if (JSON.stringify(user) !== JSON.stringify({})) {
    backendUrl.search = new URLSearchParams({ userid: user.userid }).toString();
  }

  useEffect(() => {
    fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        setUserEvents(data);
      })
      .catch(err => {
        console.log(err);
      })

    // re-render page when the apiEvents object.
  }, [JSON.stringify(userEvents)])




  return (
    <div className='flex-col'>
      <div className="flex font-serif bg-gray-100 shadow-lg">
        <div className="h-[86vh] w-1/3 overflow-y-auto">
          <SavedEventsContainer user={user} userEvents={userEvents} setUserEvents={setUserEvents} />
        </div>
        <div className="h-[86vh] w-2/3 overflow-y-auto">
          <ScheduleCard user={user} userEvents={userEvents} setUserEvents={setUserEvents} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
