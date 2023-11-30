import { useEffect, useRef, useState } from "react";

import L, { map, marker } from "leaflet";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "leaflet/dist/leaflet.css";
import "../../App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";


const MapMovingTracker = ({position})=>{
  const map = useMap();
  useEffect(()=>{
    map.setView(position, map.getZoom());
  },[map, position])
  
  return null;
}
const TrackingMap = () => {
  const [position, setPosition] = useState([]);
  const [position2, setPosition2] = useState([]);

  const successCallback = (newPosition) => {
    setPosition([newPosition.coords.latitude, newPosition.coords.longitude]);
    setPosition2([newPosition.coords.latitude, newPosition.coords.longitude]);
    // setInterval(()=>{
    //   setPosition((prevPosition) => [
    //     prevPosition[0] + 0.00020,
    //     prevPosition[1] + 0.00020,
    //   ])
    // },200)
  };

  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("positionChanged", (data) => {
      console.log(data);
      setPosition(data)
    });
    return () => {
      socket.disconnect();
    };
  }, []);


  const errorCallback = (error) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {(position.length || position.lat)  && (
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <MapMovingTracker position={position}/> */}
          <Marker position={position}></Marker>
          {/* <Marker position={position2}></Marker> */}

        </MapContainer>
      )}
    </div>
  );
};

export default TrackingMap;
