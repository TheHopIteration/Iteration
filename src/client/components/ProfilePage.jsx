import React, { useState, useEffect } from 'react'
import { Viewcomponent } from './profilepage/viewcomponent';
import { Friends } from './profilepage/Friends.jsx';
import { Footer } from './Footer';
import { ProfileCard } from './profilepage/ProfileCard';
import { TextField, Button, Stack, InputLabel, Select, MenuItem, ThemeProvider, Container, Paper, Autocomplete } from '@mui/material';

import MuiTheme from "./MuiTheme"

export const ProfilePage = ({ user }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [eventsUsername, setEventsUsername] = useState([user.username]);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');
  const [view, setView] = useState('list');
  const [allUsernames, setAllUsernames] = useState('');


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
    if (!newFriend) {
      alert('Please enter a Friend\'s username before adding Friend!')
      return;
    }
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
    if (!newFriend) {
      alert('Please enter a Friend\'s username before removing Friend!')
      return;
    }
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

  //load all usernames once upon loading
  useEffect(() => {
      fetch("/api/users/all", {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          let usernames = [];
          data.forEach((user) => {
            usernames.push(user.username);
          })
          console.log(`DATA: ${JSON.stringify(data)}`)
          setAllUsernames(usernames)
        })
  }, []);
  



  return (
    <ThemeProvider theme={MuiTheme}>
    <div className='flex-col justify-center'>
      <div className="flex font-serif bg-gradient-to-br from-custom-yellow via-custom-orange via-custom-darkcoral via-custom-darkpink to-custom-purple
 shadow-lg">
        <div className="h-[86vh] w-2/5 overflow-y-auto">
          <ProfileCard user={user}></ProfileCard>
          <Container
            className="friendslistcontainer"
            sx={
              {p:2}
            }
            >
          
          <Stack direction="row" spacing={2}>
          <Autocomplete
          disablePortal
          options={allUsernames}
          renderInput={(params) => <TextField {...params} sx={{width:210}} label="Search Users" variant="outlined"/> }
          value={newFriend}
          onChange={(e, newVal) => {setNewFriend(newVal)}}
          />
          {/* // <TextField value={newFriend} onChange={(e) => setNewFriend(e.target.value)} label='friend username' variant='outlined'/> */}
          <Button
            variant='contained'
            onClick={handleAddFriend}
          >
            Add Friend
          </Button>
          <Button
            variant='contained'
            onClick={handleRemoveFriend}
          >
            Remove Friend
          </Button>
          </Stack>
          <h2 className="text-white  text-2xl leading-tight font-bold mb-4 mt-4 flex-center w-custom500 content-center">Who I'm 'peeping'</h2>
          <Stack direction="column" spacing={2}
          sx={{
            p:2,
            bgcolor: 'background.paper',
            boxShadow: 1,
            maxWidth: 500
          }}
          >
          <Friends friends={friends}/>
          </Stack>
          </Container>
        </div>
        <div className="h-[86vh] w-3/5 overflow-y-auto justify-center">
          <Stack direction="row" spacing={2} justifyContent="center"
          sx = {{
            pt: 2,
          }}>
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
              variant="contained"
              onClick={handleList}
            >
              List View
            </Button>
            <Button
              variant="contained"
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
    </ThemeProvider>
  )
}