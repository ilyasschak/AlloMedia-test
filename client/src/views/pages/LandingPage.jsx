import liv3 from "../../assets/images/help.jpg";
import restau from "../../assets/images/jjjjjjjj.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {

    const [restaurants, setRestaurants] = useState([]);

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
      <div className="w-full h-screen flex  flex-wrap items-center justify-between p-4 flex-1 gap-7  relative">
        <img
          src={liv3}
          className=" absolute top-0 left-0 w-full h-full z-[-1] "
        />

        <div className="flex flex-col ">
          <h1 className="font-extrabold text-white text-7xl">
            <span className="">Delivering</span> <br />
            Convenience <br />
            to Your Doorstep!
          </h1>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-center mt-5 text-4xl font-bold text-orange-700">
          <h2>Our Restaurants</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-16 content-around ml-16">
          {restaurants.map((restaurant) => (
            <div class="max-w-md rounded overflow-hidden shadow-lg">
              <img class="w-full" src={restau} alt="Sunset in the mountains" />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{restaurant.nom}</div>
                <div class="text-xl mb-2">{restaurant.typeCuisine.name}</div>
                <p class="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Show Menus
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
