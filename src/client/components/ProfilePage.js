import React, { useState, useEffect } from 'react'
import { Viewcomponent } from './profilepage/viewcomponent'
import { Footer } from './Footer'
import { Button, Stack } from '@mui/material'


export const ProfilePage = ({ user }) => {
  const [userEvents, setUserEvents] = useState([]);

// view status to handle what view we're in
const [view, setView] = useState('list')
// handle button clicks
const handleCal = (e) => {
  if (view === 'list')
  setView('calendar')
};

const handleList = (e) => {
  if (view === 'calendar')
  setView('list')
}



  let backendUrl = new URL("http://localhost:3000/api/events");
  if (JSON.stringify(user) !== JSON.stringify({})) {
    backendUrl.search = new URLSearchParams({ userid: user.userid }).toString();
  }

  console.log('user object is, ', user);

  useEffect(() => {
    fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        setUserEvents(data);
        console.log("userEvents = ", userEvents);
      })
      .catch(err => {
        console.log(err);
      })

    // re-render page when the apiEvents object.
    console.log("useEffect in savedEventsContainer is fired, reloaded page due to change in apiEvents")
  }, [JSON.stringify(userEvents)])




  return (
    <div className='flex-col justify-center'>
      <div className="flex font-serif bg-gray-100 shadow-lg">
        <div className="h-[86vh] w-2/5 overflow-y-auto">
          <h1>PLACEHOLDER</h1>
        </div>
        <div className="h-[86vh] w-3/5 overflow-y-auto justify-center">
          <Stack direction="row" spacing={2} justifyContent="center"
          sx = {{
            pt: 2,
          }}>
            <Button
              variant="outlined"
              onClick={handleList}
              >
                List View
              </Button>
              <Button
                variant="outlined"
                onClick={handleCal}
                >
                  Calendar View
                </Button>
          </Stack>
          <Viewcomponent user={user} userEvents={userEvents} setUserEvents={setUserEvents} view={view}></Viewcomponent>
        </div>
      </div>
      <Footer />
    </div>
  )
}
