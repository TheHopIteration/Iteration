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
    </BrowserRouter>
  );
}

export default App;
