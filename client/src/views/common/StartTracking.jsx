import { useEffect, useState } from "react";
import L from "leaflet";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import api from "../../api";
let routingControl,
  shouldBeCleared = false;
const GetNextPosition = ({ currentPosition, targetPosition, setPosition }) => {
  const map = useMap();
  useEffect(() => {
    if (currentPosition) {
      if (routingControl) {
        map.removeControl(routingControl);
      }

      routingControl = L.Routing.control({
        waypoints: [currentPosition, targetPosition],
        geocoder: L.Control.Geocoder.nominatim(),
      })
        .on("routesfound", (e) => {
          let timed = setTimeout(() => {
            if (e.routes[0].coordinates[1]) {
              setPosition(e.routes[0].coordinates[1]);
            }
          }, 2000);
        })
        .on("routingerror", (e) => {
          console.log("Route calculation error:", e.error);
        })
        .addTo(map);
    }
    map.setView(currentPosition, map.getZoom());
  }, [currentPosition]);
};

const StartTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [targetPosition, setTargetPosition] = useState([32.240022, -8.539602]);

  const errorCallback = (error) => {
    console.log(error, "hiiii");
  };

  const setPosition = (position) => {
    setCurrentPosition(position);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition([position.coords.latitude, position.coords.longitude]);
    }, errorCallback);
    console.log(currentPosition);
  }, []);
  useEffect(() => {
    console.log(currentPosition);
    if (currentPosition) api.post("/tracking", { position: currentPosition });
  }, [currentPosition]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {currentPosition && (
        <MapContainer
          center={currentPosition}
          zoom={18}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GetNextPosition
            style={{ display: "none" }}
            currentPosition={currentPosition}
            setPosition={setPosition}
            targetPosition={targetPosition}
          />
        </MapContainer>
      )}
    </div>
  );
};

export default StartTracking;
