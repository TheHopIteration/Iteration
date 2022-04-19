import React, { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { ProfilePage } from "./components/ProfilePage";
import { EditProfilePage } from "./components/EditProfilePage"
import { Header } from "./components/Header";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
<<<<<<< HEAD
  // const [loggingOut, setLoggingOut] = useState(false);

  // useEffect(() => {
  // const sessionCheck = async () => {
  //   const response = await fetch("http://localhost:3000/auth", {
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log("returned response from auth is:", response);
  //       if (response.isLoggedIn) {
  //         setUser(response.user);
  //       }
  //     });
  // };

  // const logout = () => {
  //   console.log('HERE')
  //   fetch("http://localhost:3000/auth/logout", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({ username: user.username, userid: user.userid }),
  //   })
  //     .then((res) => {
  //       setUser({})
  //       console.log('**HERE**');
  //     })
  //     .catch((err) => {console.log(err)});
  // };

  //   if (!loggingOut) {
  //     sessionCheck();
  //     console.log('logging in')
  //   } else {
  //     logout();
  //     setLoggingOut(false);
  //     console.log('logging out')
  //   }
  // }, [document.location.href, loggingOut]);
=======
>>>>>>> f6ab0f33d6ccc99570bbc16a15bc9bd9ce8bcd77

  

  const sessionCheck = async () => {
    const response = await fetch("http://localhost:3000/auth", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.isLoggedIn) {
          setUser(response.user);
        }
      });
  };

  //run sessionCheck once upon render to update user state if user already logged in. Persists sessions
  useEffect(() => {
    sessionCheck();
  }, []);

  return (
    <BrowserRouter>
<<<<<<< HEAD
      <UserContext.Provider value={user}>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
              />
            }
          ></Route>
          <Route path="/login" element={<LoginPage user={user} sessionCheck={sessionCheck} />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route
            path="/profile"
            element={
              <ProfilePage
                user={user}
              />
            }
          ></Route>
        </Routes>
      </UserContext.Provider>

=======
    <Header user={user} setUser={setUser}/>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
            />
          }
        ></Route>
        <Route path="/login" element={<LoginPage user={user} sessionCheck={sessionCheck}/>}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={user}
            />
          }
        ></Route>
        <Route
          path="/editProfile"
          element={
            <EditProfilePage
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
      </Routes>
>>>>>>> f6ab0f33d6ccc99570bbc16a15bc9bd9ce8bcd77
    </BrowserRouter>
  );
}

export default App;
