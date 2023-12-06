import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RestaurantPage() {
  const restaurant_id = useParams().restaurant_id;
  const [restaurant, setRestaurant] = useState({});
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/restaurants/${restaurant_id}`)
      .then(function (response) {
        console.log(response.data);
        setRestaurant(response.data.restaurant);
        setMenus(response.data.menus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Restaurant Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Restaurant Information</h2>
        <p>
          <span className="font-semibold">Name:</span> {restaurant?.nom}
        </p>
        <p>
          <span className="font-semibold">Cuisine Type:</span>{" "}
          {restaurant?.typeCuisine?.name}
        </p>
        <p>
          <span className="font-semibold">Location:</span>{" "}
          {restaurant?.emplacement?.join(", ")}
        </p>
        <p>
          <span className="font-semibold">Owner:</span> {restaurant?.owner}
        </p>
      </div>

      {/* Menu Information */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Menus</h2>
        {menus.map((menu) => (
          <div key={menu._id} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{menu.nom}</h3>
            <p>
              <span className="font-semibold">Menu ID:</span> {menu._id}
            </p>

            {/* Articles Information */}
            {menu.articles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Articles</h4>
                <ul>
                  {menu.articles.map((article) => (
                    <li key={article._id}>
                      <p>
                        <span className="font-semibold">Plat:</span>{" "}
                        {article.Plat}
                      </p>
                      <p>
                        <span className="font-semibold">Prix:</span>{" "}
                        {article.prix} DH
                      </p>
                      <p>
                        <span className="font-semibold">Description:</span>{" "}
                        {article.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
