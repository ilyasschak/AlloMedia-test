import { useState, useEffect } from 'react';
import api from '../../api';
import  Navbar  from '../../views/common/Navbar';


const Command = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/Commands'); 
        const data = response.data;
        console.log("data :" , data);
        setCommands(data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };

    fetchCommands();
  }, []); 

  return (
  <div className='p-20 '>
    <h2 className=' mb-4 text-lg font-bold'>Your Commands</h2>
    {commands && commands.length && (
      <div className='gap-12 flex flex-col '>
        {commands.map((command) => (
          <div key={command._id} className="bg-white p-6 rounded-lg shadow-lg ">
            <h3 className="text-blue-300 mb-4 text-sm font-bold">Command ID: {command._id}</h3>
            <p>Status: {command.status}</p>
            <ul>
              {command.articles.map((article, index) => (
                <li key={index}>
                  <p>Article ID: {article._id._id}</p>
                  <p>Plat: {article._id.Plat}</p>
                  <p>Price: {article._id.prix}</p>
                  <p>Description: {article._id.description}</p>
                  <p>Quantity: {article.quantite}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Command;
