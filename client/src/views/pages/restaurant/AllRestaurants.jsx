import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";

export default function AllRestaurants(){
    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/restaurants")
        .then(function (response) {
            setRestaurants(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    }, []);

    console.log(restaurants);

    return (
      <div className="mx-4 my-4">
        <h1 className="text-7xl text-center font-bold mb-4">Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white p-4 shadow-md rounded-md"
            >
              <div className="mb-4">
                <img
                  src="https://a.storyblok.com/f/123939/2240x1260/ceebc9c756/emplacement-restaurant.png"
                  alt={`${restaurant.nom} Image`}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{restaurant.nom}</h2>
              <p className="text-gray-500 mb-2">
                {restaurant.typeCuisine.name}
              </p>
              <Link to={`/restaurantMenus/${restaurant._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Show Menus
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}