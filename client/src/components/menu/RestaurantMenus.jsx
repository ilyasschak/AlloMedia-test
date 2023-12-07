import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function RestaurantMenus(){
    const [menus, setMenus] = useState([]);
    const restaurantId = useParams().id

    useEffect(()=>{
        axios
          .post("http://localhost:3000/api/menu/restaurantsMenus", {
            restaurantId: restaurantId,
          })
          .then((response) => {
            setMenus(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    }, [])

    return (
      <div className="mx-4 my-4">
        <h1 className="text-7xl font-bold mb-4 text-center">Menus</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="bg-white p-4 shadow-md rounded-md mb-4"
            >
              <h2 className="text-xl font-semibold mb-3">{menu.nom}</h2>
              <Link
                to={`/plats/${menu._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                See Plates
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}