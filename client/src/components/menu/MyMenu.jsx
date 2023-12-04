import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PopupsController from '../../views/common/PopupsController';
import axios from 'axios';
import { useUser } from '../../contexts/userContext';

const MyMenu = () => {
  const [menus, setMenus] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeletionConfirmed, setConfirmDeletion] = useState(false);
  const [menuToBeDeleted, setMenuToBeDeleted] = useState(null);

  const{user, getUser} = useUser();
  
  useEffect(()=>{
    getUser();
  },[]);


  function openModal(){
    setModalOpen(true);   
  }

  function closeModal(){
      setModalOpen(false);
  }

  useEffect(() => {
    console.log(user);
    const fetchMenus = async () => {
      try {
        axios.post(`http://localhost:3000/api/menu/`, {
          owner_id : user._id
        }).then(response => {
          console.log(response.data);
          setMenus(response.data);
        }).catch(error => {
          console.error(error)
        })
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, [user]); 

  useEffect(() => {    
    if (isDeletionConfirmed) {
      axios.post('http://localhost:3000/api/menu/delete', {
        idToDelete : menuToBeDeleted
      }).then((response) => {
        setMenus((prevMenus) => prevMenus.filter(menu => menu._id !== menuToBeDeleted));
        closeModal();
        setConfirmDeletion(false);
        setMenuToBeDeleted(null);  
      }).catch((error) => {
        console.error(error);
      })

    }
  }, [isDeletionConfirmed]);

  return (
    <div className='flex flex-wrap gap-3 justify-between w-full p-12'>
      {menus?.map((menu) => (
        <div
          key={menu._id}
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {menu?.nom}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {menu?.restaurant[0]?.nom}
          </p>
          <div className='flex gap-2'>
            <div>
              <Link type="button" to={`/plats/${menu._id}`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700">
                Voir
              </Link>
            </div>
            <div>
              <button onClick={() => {openModal(); setMenuToBeDeleted(menu._id)}} className="bg-orange-600 rounded-md text-white py-2 px-4 mt-2 hover:bg-orange-700">Delete</button>
              <PopupsController 
                showModal={isModalOpen} 
                closeModal={closeModal} 
                bodyContent={"Are you sure you want to delete this menu"} 
                headerContent={"Confirm deletion"}
                footerContent={
                  <div className='flex gap-3 justify-end'>
                    <button className="bg-gray-600 rounded-md text-white py-2 px-4 mt-2 hover:bg-gray-700" onClick={closeModal}>Cancel</button>
                    <button className="bg-orange-600 rounded-md text-white py-2 px-4 mt-2 hover:bg-orange-700" onClick={() => {setConfirmDeletion(true);}}>Delete</button>
                  </div>
                }
              />
            </div>
            <div>
              <Link type="button" to={`/menu/${menu._id}`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700">
                Update
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyMenu;
