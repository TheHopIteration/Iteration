import React, { useState, useEffect } from 'react'
// const db = require("../models/dataModels");


export const EditProfilePage = ({ user, setUser, setLoggingOut }) => {
  const [inputs, setInputs] = useState({});
  
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/users/${user.userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ "firstName": inputs.firstName, "lastName": inputs.lastName, "email": inputs.email, "homeLocation": inputs.homeLocation}),
    })
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
  <form onSubmit={handleSubmit}>
  <div className="form-group mb-6">
      <label htmlFor="firstName" className="form-label inline-block mb-2 text-gray-700">First name</label>
      <input type="text" name="firstName" value={inputs.firstName || ""} onChange={handleChange} className="form-control
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
      <input type="text" name="lastName" value={inputs.lastName || ""} onChange={handleChange} className="form-control
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
      <input type="email" name="email" value={inputs.email || ""} onChange={handleChange} className="form-control
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
      <input type="text" name="homeLocation" value={inputs.homeLocation || ""} onChange={handleChange} className="form-control
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
        placeholder="Enter address..."/>
    </div>
    <button type="submit" onClick={handleSubmit} className="
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
