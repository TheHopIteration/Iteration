import React, { useState, useEffect } from 'react'
import { Viewcomponent } from './profilepage/viewcomponent'
import { Footer } from './Footer'
import { TextField, Button, Stack } from '@mui/material'


export const ProfilePage = ({ user }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [eventsUserId, setEventsUserId] = useState([user.userid]);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

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
  
  
  
  
  
  let backendGetUserEventsUrl = new URL("http://localhost:3000/api/events");
  if (JSON.stringify(user) !== JSON.stringify({})) {
    backendGetUserEventsUrl.search = new URLSearchParams({ userid: user.userid }).toString();
  }
  
  let backendGetFriendsUrl = new URL("http://localhost:3000/api/friends");
  if (JSON.stringify(user) !== JSON.stringify('')) {
    backendGetFriendsUrl.search = new URLSearchParams({ username: user.username }).toString();
  }
  
  // let backendNewFriendUrl = new URL("http://localhost:3000/api/friends");
  // if (JSON.stringify(user) !== JSON.stringify('')) {
  //   backendNewFriendUrl.search = new URLSearchParams();
  // }
  
  const handleAddFriend = () => {
    if (!newFriend) alert('Please enter a Friend\'s username before adding Friend!')
    console.log('INVOKED');
    console.log(`CURRENT newFriend: ${newFriend}, username: ${user.username}`)
    fetch('http://localhost:3000/api/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({
        "userA": user.username,
        "userB": newFriend
      })
    }).then(response => response.json())
      .then(data => {
        setFriends([...friends, data]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetch(backendGetUserEventsUrl, {
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

  //load friends once upon loading
  useEffect(() => {
    fetch(backendGetFriendsUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        let friends = [];
        for (let friend of data) {
          friends.push(friend['friend_b'])
        }
        setFriends([...friends]);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  let friendDivs = [];
  for (let i of friends) {
    friendDivs.push(`<h1>${i}</h1>`);
  }

  return (
    <div className='flex-col justify-center'>
      <div className="flex font-serif bg-gray-100 shadow-lg">
        <div className="h-[86vh] w-2/5 overflow-y-auto">
          <div>Current Friends</div>
          {friendDivs}
        </div>
        <div className="h-[86vh] w-3/5 overflow-y-auto justify-center">
          <Stack direction="row" spacing={2} justifyContent="center"
          sx = {{
            pt: 2,
          }}>
            <TextField onChange={(e) => setNewFriend(e.target.value)} label='friend username' variant='outlined'/>
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