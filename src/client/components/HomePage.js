import React from "react";
import { Map } from "./homepage/Map";
import { Footer } from "./Footer";
import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from '@react-google-maps/api';
import { useLocation } from "react-router-dom";
import { SearchBox } from './homepage/SearchBox';
import { EventsContainer } from './homepage/EventsContainer'

const placeLib = ['places'];

export const HomePage = ({ user, setUser, setLoggingOut }) => {
  const [apiEvents, setApiEvents] = useState([]);
  const [mapBase, setMapBase] = useState({});
  const [circleRadius, setCircleRadius] = useState(0);

  const location = useLocation();

  const mapRef = useRef();

  // load GoogleMap API key here so we don't call it twice in the autocomplete and google map components
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS,
    libraries: placeLib
  })


  useEffect(() => {
    // re-render page when the apiEvents object or when user logs in or out changes.
  }, [apiEvents.length, JSON.stringify(user), location])

  if (!isLoaded) return <div>Waiting for Google API to load ...</div>;

  return (
    <div>
      <div>
      <SearchBox apiEvents={apiEvents} setApiEvents={setApiEvents} setMapBase={setMapBase} mapRef={mapRef} setCircleRadius={setCircleRadius} />
      </div>

      <div class="flex-col visible md:hidden items-center justify-center">
        <div> 
          <Map apiEvents={apiEvents} mapBase={mapBase} mapRef={mapRef} circleRadius={circleRadius} />
          &nbsp;
        </div>
        <div>
          <EventsContainer apiEvents={apiEvents} user={user} />
        </div>
      </div>

      <div class = 'flex invisible md:visible justify-center'>
        <Map apiEvents={apiEvents} mapBase={mapBase} mapRef={mapRef} circleRadius={circleRadius} />
        <EventsContainer apiEvents={apiEvents} user={user}/>
      </div>

      <Footer />
    </div>
  );

};
