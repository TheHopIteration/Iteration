import React, { useState, useEffect } from 'react'
import { Viewcomponent } from './profilepage/viewcomponent';
import { Friends } from './profilepage/Friends.jsx';
import { Footer } from './Footer';
import { ProfileCard } from './profilepage/ProfileCard';
import { TextField, Button, Stack, InputLabel, Select, MenuItem } from '@mui/material';


export const ProfilePage = ({ user }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [eventsUsername, setEventsUsername] = useState([user.username]);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');
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
    backendGetUserEventsUrl.search = new URLSearchParams({ username: eventsUsername }).toString();
  }
  
  let backendGetFriendsUrl = new URL("http://localhost:3000/api/friends");
  if (JSON.stringify(user) !== JSON.stringify('')) {
    backendGetFriendsUrl.search = new URLSearchParams({ username: user.username }).toString();
  }

  const handleEventsUsernameChange = (e) => {
    setEventsUsername([e.target.value]);
  }
  
  const handleAddFriend = () => {
    if (!newFriend) alert('Please enter a Friend\'s username before adding Friend!')
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
        setNewFriend('');
        setFriends([...friends, data['friend_b']]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleRemoveFriend = () => {
    if (!newFriend) alert('Please enter a Friend\'s username before removing Friend!')
    fetch('http://localhost:3000/api/friends', {
      method: 'DELETE',
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
        setNewFriend('');
        setFriends(friends.filter(friend => friend !== data['friend_b']))
      })
      .catch(err => {
        console.log(err);
      })
  }

  // re-render page when the apiEvents object.
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

  }, [eventsUsername])


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
  }, [eventsUsername]);


  return (
    <div className='flex-col justify-center'>
      <div className="flex font-serif bg-gray-100 shadow-lg">
        <div className="h-[86vh] w-2/5 overflow-y-auto">
          <ProfileCard user={user}></ProfileCard>
        </div>
        <div className="h-[86vh] w-2/5 overflow-y-auto">
          <div>Current Friends:</div>
          <Friends friends={friends}/>
        </div>
        <div className="h-[86vh] w-3/5 overflow-y-auto justify-center">
          <Stack direction="row" spacing={2} justifyContent="center"
          sx = {{
            pt: 2,
          }}>
            <TextField value={newFriend} onChange={(e) => setNewFriend(e.target.value)} label='friend username' variant='outlined'/>
            <Button
              variant='outlined'
              onClick={handleAddFriend}
            >
              Add Friend
            </Button>
            <Button
              variant='outlined'
              onClick={handleRemoveFriend}
            >
              Remove Friend
            </Button>
            <InputLabel>User to track</InputLabel>
            <Select
              value={eventsUsername}
              label="User to track"
              onChange={handleEventsUsernameChange}
            >
              <MenuItem value={user.username}>Me</MenuItem>
              {friends.map((friend, i) =>
                <MenuItem key={i} value={friend}>{friend}</MenuItem>
              )}
            </Select>
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