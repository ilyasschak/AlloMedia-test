import axios from "axios";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Link } from "react-router-dom";

function LocationMarker({ trigger }) {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
  });

  useEffect(() => {
    if (trigger) {
      map.locate();
    }
  }, [trigger]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function RestaurantsMap() {
  const [restaurants, setRestaurants] = useState([]);
  const [locate, setLocate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/restaurants")
      .then(function (response) {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker trigger={locate} />
        {restaurants.map((restaurant, index) => (
          <Marker key={index} position={restaurant.emplacement}>
            <Popup>
              <Link
                to={`/restaurants/${restaurant._id}`}
                style={{ cursor: "pointer" }}
              >
                {restaurant.nom}
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="flex justify-center align-middle mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setLocate(!locate)}
        >
          Show my location
        </button>
      </div>
    </div>
  );
}
