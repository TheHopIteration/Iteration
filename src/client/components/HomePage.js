import React from "react";
import { Map } from "./homepage/Map";
import { Footer } from "./Footer";
import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from '@react-google-maps/api';
import { useLocation } from "react-router-dom";
import { SearchBox } from './homepage/SearchBox';
import { EventsContainer } from './homepage/EventsContainer'



const placeLib = ['places'];
export const HomePage = ({ user }) => {
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


  // re-render page when the apiEvents object
  useEffect(() => {
  }, [apiEvents.length, location])

  if (!isLoaded) return <div>Waiting for Google API to load ...</div>;

  return (
    <div> 
      <div> 
      <SearchBox apiEvents={apiEvents} setApiEvents={setApiEvents} setMapBase={setMapBase} mapRef={mapRef} setCircleRadius={setCircleRadius} />
      </div>

      <div className = "flex flex-col md:flex-row">
        <Map apiEvents={apiEvents} mapBase={mapBase} mapRef={mapRef} circleRadius={circleRadius} />
        <EventsContainer apiEvents={apiEvents} user={user}/>
      </div>

      <Footer />
    </div>
  );

};
