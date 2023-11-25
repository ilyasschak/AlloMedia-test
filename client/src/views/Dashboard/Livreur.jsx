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





  return (
    <div>
      <h1>Helloooo Deliveryman</h1>
    </div>
  )
}

export default Livreur
