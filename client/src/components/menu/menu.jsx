import  { useEffect, useState } from 'react';

const Menu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/menu');
        const data = await response.json();
        console.log(data);
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []); 

  return (
    <div className='flex flex-wrap gap-3 justify-between w-full p-12'>
      {menus.map((menu) => (
        <div
          key={menu._id}
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {menu.nom}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {menu.restaurant.nom}
          </p>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
