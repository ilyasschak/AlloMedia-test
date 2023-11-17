import React, { useEffect, useState } from 'react';
import { Button, Card } from 'flowbite-react';

const MenuItem = ({ title, description }) => (
  <Card className="max-w-sm">
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
    <Button>
      Add To Cart 
      <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  </Card>
);

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/menu");
          const data = await response.json();
          console.log(data);  
          const menuArray = Array.isArray(data) ? data : [data];
      
          setMenuData(menuArray);
        } catch (error) {
          console.error("Error fetching menu data:", error.message);
        } finally {
          setLoading(false);
        }
      };

    fetchMenu();
  }, []);

  return (
    <div className='flex gap-5 flex-wrap p-12'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        menuData.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              title={menuItem.nom || 'Default Title'}
              description={(menuItem.restaurant && menuItem.restaurant.nom) || 'Default Description'}
            />
          ))
      )}
    </div>
  );
};

export default Menu;
