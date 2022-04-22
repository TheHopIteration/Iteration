import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// const db = require("../models/dataModels");


export const EditProfilePage = ({ user, setUser, setLoggingOut }) => {
  let navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    address: user.home_location,
  })

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/users/${user.userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ "firstName": inputs.firstName, "lastName": inputs.lastName, "email": inputs.email, "homeLocation": inputs.address }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        navigate("/");
        // window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="bg-gradient-to-br from-custom-yellow via-custom-orange via-custom-darkcoral via-custom-darkpink to-custom-purple flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-screen g-6 bg-gray-50">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label htmlFor="firstName" className="form-label inline-block mb-2 text-gray-700">First name</label>
            <input type="text" name="firstName" defaultValue={user.first_name || ""} onChange={handleInputChange} className="form-control
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
              placeholder='First name'
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="lastName" className="form-label inline-block mb-2 text-gray-700">Last name</label>
            <input type="text" name="lastName" defaultValue={user.last_name || ""} onChange={handleInputChange} className="form-control
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
              placeholder="Last name"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="inputEmail" className="form-label inline-block mb-2 text-gray-700">Email address</label>
            <input type="email" name="email" defaultValue={user.email || ""} onChange={handleInputChange} className="form-control
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
              aria-describedby="emailHelp" />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="inputAddress" className="form-label inline-block mb-2 text-gray-700">Home address</label>
            <input type="text" name="address" defaultValue={user.home_location || ""} onChange={handleInputChange} className="form-control
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
              placeholder='Address'
            />
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
      </div></div>
  )
}
