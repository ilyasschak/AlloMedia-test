import React from 'react'
import io from 'socket.io-client';
import { useEffect } from 'react';


const socket = io.connect("http://localhost:3000");

const Livreur = () => {



        useEffect(()=>{
            socket.on('recieved notification', (data)=>{
                alert(data.message)
            })
        },[socket])


    //   Initialize socket connection outside the component
//   const socket = io('http://localhost:3000');

//   useEffect(() => {
//     // Écouter les notifications de nouvelle commande
//     socket.on('nouvelle-commande', (data) => {
//       console.log('Nouvelle commande reçue:', data.message);
//     });

//     // Cleanup the socket connection on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);


  return (
    <div>
      <h1>Helloooo Deliveryman</h1>
    </div>
  )
}

export default Livreur
