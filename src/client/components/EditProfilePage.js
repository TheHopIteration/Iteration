import React, { useState, useEffect } from 'react'
// const db = require("../models/dataModels");
import { Header } from './Header'
import { SavedEventsContainer } from './profilepage/SavedEventsContainer'
import { ScheduleCard } from './profilepage/ScheduleCard'
import { Footer } from './Footer'


export const EditProfilePage = ({ user, setUser, setLoggingOut }) => {
  const [userEvents, setUserEvents] = useState([]);
  console.log("user", user);
  
  useEffect(() => {
    //need to get user data from user.userid
    // const sqlQuery = `
    //   SELECT first_name, last_name, email, home_location
    //   FROM "public"."users"
    //   WHERE userid = $1;
    // `
    // const params = [user.userid];
    // const data = db.query(sqlQuery, params);
    // console.log(data);
  })



  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
  <form>
  <div className="form-group mb-6">
      <label htmlFor="firstName" className="form-label inline-block mb-2 text-gray-700">First name</label>
      <input type="text" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
        placeholder="First name..."/>
    </div>
    <div className="form-group mb-6">
      <label htmlFor="lastName" className="form-label inline-block mb-2 text-gray-700">Last name</label>
      <input type="text" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
        placeholder="Last name..."/>
    </div>
    <div className="form-group mb-6">
      <label htmlFor="inputEmail" className="form-label inline-block mb-2 text-gray-700">Email address</label>
      <input type="email" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
        aria-describedby="emailHelp" placeholder="Email address..."/>
    </div>
    <div className="form-group mb-6">
      <label htmlFor="inputAddress" className="form-label inline-block mb-2 text-gray-700">Home address</label>
      <input type="text" className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
        placeholder="Enter email..."/>
    </div>
    <button type="submit" className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Submit</button>
  </form>
</div>
  )
}
