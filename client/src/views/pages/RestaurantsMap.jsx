import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function RestaurantsMap(){

    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3000/api/restaurants')
        .then(function(response){
            setRestaurants(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        }) 
    }, []);

    return(
        <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {restaurants.map((restaurant, index) => (
                <Marker 
                    key={index}
                    position={restaurant.emplacement}
                >
                    <Popup>
                        <div>
                            <p>{restaurant.nom}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}