import React, { useState, useEffect } from 'react';
import api from '../../api';

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
    <div>
      <h2>Your Commands</h2>
      {commands && commands.length && <ul>
                {commands.map((command) => (
            <li key={command._id}>
                <p>Command ID: {command._id}</p>
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
        </li>
        ))}
      </ul>}
    </div>
  );
};

export default Command;
