import React, { useState, useEffect } from 'react'
import { Viewcomponent } from './profilepage/viewcomponent'
import { Footer } from './Footer'
import { Button, Stack } from '@mui/material'


export const ProfilePage = ({ user }) => {
  const [eventsUserId, setEventsUserId] = useState([user.userid]);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  console.log('User Object: ', user)
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
  
  let backendGetFriendsUrl = new URL("http://localhost:3000/api/friends");
  if (JSON.stringify(user) !== JSON.stringify({})) {
    backendGetFriendsUrl.search = new URLSearchParams({ userid: eventsUserId }).toString();
  }
  
  let backendNewFriendUrl = new URL("http://localhost:3000/api/friends");
  if (JSON.stringify(user) !== JSON.stringify({})) {
    backendNewFriendUrl.search = new URLSearchParams({ userA: user.username, userB: newFriend }).toString();
  }
  
  const handleAddFriend = (e) => {
    if (!newFriend) alert('Please enter a Friend\'s username before adding Friend!')
  
    fetch(backendNewFriendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        setFriends([...friends, data]);
      })
      .catch(err => {
        console.log(err);
      })
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


  fetch(backendGetFriendsUrl, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(data => {
      console.log(`FRIENDS DATA: ${data}`);
      setFriends(data);
    })
    .catch(err => {
      console.log(err);
    })


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
            <TextField onChange={setNewFriend} label='friend username' variant='outlined'/>
            <Button
              variant='outlined'
              onClick={handleAddFriend}
            >
              Add Friend
            </Button>
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