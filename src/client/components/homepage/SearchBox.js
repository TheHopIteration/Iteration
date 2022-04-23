import React from "react";
import regeneratorRuntime from "regenerator-runtime";
import AutoComplete from "react-google-autocomplete";

export const SearchBox = ({ apiEvents, setApiEvents, setMapBase, mapRef, setCircleRadius, user }) => {
  let todayDate = new Date().toISOString().slice(0, 10);

  const onFind = async () => {
    let location = document.getElementById("locationForm").value;
    if (location === '') {
      alert("Please enter a valid location");
      return;
    }

    // geocode entered address using google geocoding api
    let geocodingUrl = new URL('https://maps.googleapis.com/maps/api/geocode/json')
    let geocodingParams = { address: location, key: process.env.GOOGLE_MAPS }
    geocodingUrl.search = new URLSearchParams(geocodingParams).toString();
    let geocodedAddress = await fetch(geocodingUrl).then(res => res.json());

    // pull latitude and longitude from results of geocoding api
    let latitude, longitude;
    latitude = geocodedAddress.results[0].geometry.location.lat;
    longitude = geocodedAddress.results[0].geometry.location.lng;
    // update mapBase state with resulting lat/long
    setMapBase({ lat: latitude, lng: longitude });

    // by default radius is set to 5 miles
    let radius = document.getElementById("radiusForm").value;
    setCircleRadius(radius);

    // by default the start and end date are today's date
    let startDate = document.getElementById("startDateForm").value;
    let endDate = document.getElementById("endDateForm").value;
    let timeAndDistance;
    const distanceDuration = document.querySelector('#distanceDuration');

    //**SETUP AND MAKE CALL FOR EVENTS */
    const apiKey = process.env.PREDICTHQ_API_KEY;
    // today's date for filling in default value of date input boxes in options

    // function to check which categories are checked, returns an array of categories
    const getCheckedCategories = () => {
      const arr = [];
      const checked = document.querySelectorAll('input[type=checkbox]:checked');
      for (const c of checked) {
        if (c.value !== 'distanceDuration') arr.push(c.value);
      }
      return arr.length ? arr.join(', ') : '';
    }
    // params for calling predictHQ api
    const eventParams = {
      category: getCheckedCategories(),
      "active.gte": startDate,
      "active.lte": endDate,
      within: radius + "mi@" + latitude + "," + longitude,
      limit: 25,
    };
    let url = new URL("https://api.predicthq.com/v1/events");
    url.search = new URLSearchParams(eventParams).toString();
    //headers for predictHQ get request
    const eventAPIHeader = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
      },
    };
    // make a get request to predictHQ and save the data in the apiEvents state
    //updated to use await instead of both await and .then
    try {
      const response = await fetch(url, eventAPIHeader);
      const events = await response.json();
      for (const event of events.results) {
        if (event.location) {
          event.location[0] += Math.pow(10, -4) * (Math.random() * (1 - (-1)) - 1)
          event.location[1] += Math.pow(10, -4) * (Math.random() * (1 - (-1)) - 1)
        }
      }
      if (JSON.stringify(user) !== '{}' && distanceDuration.checked) {
        //   //fetch distance from home 
        //   timeAndDistance = await calculateDistance(user.home_location, event.entities[0].formatted_address, event.location);
        //   event.distance = timeAndDistance.rows[0].elements[0].distance.text;
        //   event.duration = timeAndDistance.rows[0].elements[0].duration.text;
        Promise.all(events.results.map(event => calculateDistance(user.home_location, event.entities[0].formatted_address, event.location)))
          .then(result => {
            for (let i = 0; i < result.length; i++) {
              console.log(events.results[i]);
              events.results[i].distance = result[i].rows[0].elements[0].distance.text;
              events.results[i].duration = result[i].rows[0].elements[0].duration.text;
            }
            console.log('returned data from predictHQ api is:', events.results);
            setApiEvents(events.results);
          })
      }
      else {
        console.log('returned data from predictHQ api is:', events.results);
        setApiEvents(events.results);
      }
    } catch (error) {
      console.log(error);
    }

    // .then((response) => response.json())
    //   .then((data) => {
    //     data.results.forEach((event) => {
    //       // console.log(`EVENT: ${JSON.stringify(event)}`);
    //       if (event.location) {
    //         event.location[0] += Math.pow(10, -4) * (Math.random() * (1 - (-1)) - 1)
    //         event.location[1] += Math.pow(10, -4) * (Math.random() * (1 - (-1)) - 1)
    //       }
    //       if (JSON.stringify(user) !== '{}') {
    //         //fetch distance from home 
    //         timeAndDistance = calculateDistance(user.home_location, event.entities[0].formatted_address, event.location);
    //         console.log(timeAndDistance.rows);
    //       }
    //     })

    //     console.log('returned data from predictHQ api is:', data.results);
    //     setApiEvents(data.results);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const calculateDistance = async (origin, destination, destinationLatLongArr) => {
    const geocodingUrl = new URL('https://maps.googleapis.com/maps/api/geocode/json')
    const geocodingParams = { address: origin, key: process.env.GOOGLE_MAPS }
    geocodingUrl.search = new URLSearchParams(geocodingParams).toString();
    const geocodedAddress = await fetch(geocodingUrl).then(res => res.json());

    const originLatLng = { lat: geocodedAddress.results[0].geometry.location.lat, lng: geocodedAddress.results[0].geometry.location.lng };
    const destinationLatLng = { lat: destinationLatLongArr[0], lng: destinationLatLongArr[1] };

    const service = new google.maps.DistanceMatrixService();
    const request = {
      origins: [origin, originLatLng],
      destinations: [destination, destinationLatLng],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false,
    };
    return service.getDistanceMatrix(request)
  };

  // Search Box className="flex bg-slate-50 flex-col justify-center items-center w-full p-5 pl-2 pb-2"

  return (
    <div id="SearchBox" className="flex w-full m-4 items-center justify-center ">

        <div className="text-md font-semibold text-black mr-1">Location:  </div>

        <AutoComplete id="locationForm"
          className= "w-72 px-3 py-2 font-normal text-black placeholder-gray-600 bg-white bg-clip-padding border-2 border-solid border-gray-600 rounded transition ease-in-out focus:text-black focus:bg-white focus:border-custom-darkcoral focus:outline-none"

        // apiKey={process.env.GOOGLE_MAPS}

          options={{
            types: ["geocode"],
            componentRestrictions: { country: "us" },
          }}
      
          onPlaceSelected={(place) => {
            console.log('returned autocompleted place is: ', place);
          }}/>

      <div className="flex visible md:hidden"> 
        <button 
            className="px-2 py-2 border-2 border-custom-darkcoral text-custom-darkcoral ml-1 font-semibold text-sm uppercase rounded hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg transition duration-150 ease-in-out"
            type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-custom-darkcoral" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>

        </button>

          <button
            onClick={() => {
              onFind();
            }}
            className="px-2 py-2 border-2 border-custom-darkcoral text-white bg-custom-darkcoral ml-1 text-sm font-semibold uppercase rounded hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg transition duration-150 ease-in-out"
            type="button"  data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="invisible md:visible" > 
          <button 
            className="px-4 py-2 border-2 border-custom-darkcoral text-custom-darkcoral ml-4 font-semibold text-sm uppercase rounded hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg transition duration-150 ease-in-out"
            type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          >
            Filter Events
          </button>

          <button
            onClick={() => {
              onFind();
            }}
            className="px-4 py-2 border-2 border-custom-darkcoral text-white bg-custom-darkcoral ml-4 mr-4 text-sm font-semibold uppercase rounded hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg transition duration-150 ease-in-out"
            type="button" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          >
            Search Events
          </button>
        </div>


      <div 
        className="offcanvas offcanvas-start fixed bottom-0 flex flex-col max-w-full bg-custom-yellow invisible shadow-sm outline-none transition duration-300 ease-in-out text-black top-0 left-0 border-none w-96" 
        tabIndex="-1" 
        id="offcanvasExample" 
        aria-labelledby="offcanvasExampleLabel">
            
        <div className="offcanvas-header flex mt-1 items-center justify-between p-4">
        
        <h3 
          className="offcanvas-title mb-0 leading-normal text-xl font-semibold" 
          id="offcanvasExampleLabel">
          Search Options
        </h3>

        <button 
          type="button" 
          className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg" 
          data-bs-dismiss="offcanvas" 
          aria-label="Close">
        </button>
      </div>

      <div className="invisible md:visible" >

        <div className="flex mt-2 justify-center"> 
          <div>
            <div className="flex flex-col md:flex-row mb-3">
              <div className="text-md text-black mt-1 mr-1">Start date</div>
              <input 
                type="date"
                className="form-control w-48 px-3 py-1.5 text-base font-normal text-gray-600 bg-white bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-custom-darkcoral focus:outline-none"
                id="startDateForm"
                defaultValue={todayDate}
                placeholder="04-01-2022"
                onChange={(e) => { }}
              />
            </div>

            <div className="mb-3 flex flex-col md:flex-row">
              <div className="text-md text-black mt-1 mr-2.5">End date</div>
              <input
                type="date"
                className= "form-control w-48 px-3 py-1.5 text-base font-normal text-gray-600 bg-white bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-custom-darkcoral focus:outline-none"
                id="endDateForm"
                defaultValue={todayDate}
                placeholder="04-30-2022"
                onChange={(e) => { }}
              />
            </div>

            <div className="mb-3 flex flex-col md:flex-row">
              <div className="text-md text-black mt-1 mr-1">Radius (miles)</div>
              <input
                type="text"
                className= "form-control w-40 px-3 py-1.5 text-base font-normal text-gray-600 bg-white bg-clip-padding border border-solid border-gray-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-custom-darkcoral focus:outline-none"
                id="radiusForm"
                defaultValue="5"
                placeholder="5"
                onChange={(e) => { }}
              />
            </div>

            <div className="text-md text-black mb-1 mt-5">Categories</div>
               <div className="form-check">
                <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="community"
                  id="flexCheckCommunity"
                  defaultChecked={true}
                />
                <label 
                  className="form-check-label inline-block text-black" 
                  htmlFor="flexCheckCommunity"
                >
                  Community
                </label>
              </div>

               <div className="form-check">
                 <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="concerts"
                  id="flexCheckConcerts"
                  defaultChecked={true}
                 />
                 <label 
                  className="form-check-label inline-block text-black" 
                  htmlFor="flexCheckConcerts"
                >
                  Concerts
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="conferences"
                  id="flexCheckConferences"
                  defaultChecked={true}
                />
                <label
                  className="form-check-label inline-block text-black"
                  htmlFor="flexCheckConferences"
                >
                  Conferences
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="expos"
                  id="flexCheckExpos"
                  defaultChecked={true}
                />
                <label
                  className="form-check-label inline-block text-black"
                  htmlFor="flexCheckExpos"
                >
                  Expos
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="festivals"
                  id="flexCheckFestivals"
                  defaultChecked={true}
                />
                <label
                  className="form-check-label inline-block text-black"
                  htmlFor="flexCheckFestivals"
                >
                  Festivals
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="performing-arts"
                  id="flexCheckPerformingArts"
                  defaultChecked={true}
                />
                <label
                  className="form-check-label inline-block text-black"
                  htmlFor="flexCheckPerformingArts"
                >
                  Performing Arts
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="sports"
                  id="flexCheckSports"
                  defaultChecked={true}
                />
                <label
                  className="form-check-label inline-block text-black"
                  htmlFor="flexCheckSports"
                >
                  Sports
                </label>
              </div>

              <div className="text-md text-gray-500 mb-1 mt-1">Other</div>

              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-custom-darkcoral checked:border-custom-darkcoral focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value="distanceDuration"
                  id="distanceDuration"
                  defaultChecked={false}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="distanceDuration"
                >
                  Enable Distance and Duration
                </label>
              </div>

              <button type="button" className="mt-8 px-4 py-2 border-2 border-custom-darkcoral text-white bg-custom-darkcoral mr-4 text-sm font-semibold uppercase rounded hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="offcanvas">
                Close Options</button>
            </div>

          </div>
        </div>
      </div>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="noLocationModal"
        tabIndex="-1"
        aria-labelledby="noLocationModal"
        aria-modal="true"
        role="dialog">

        <div className="modal-dialog modal-sm relative w-auto pointer-events-none">

          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">

            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="noLocationModalLabel">
                Error
              </h5>
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>

            <div className="modal-body relative p-4">
              Please enter a valid location
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
