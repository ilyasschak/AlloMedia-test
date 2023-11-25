import React, { useState } from 'react'
import Sidebar from '../common/Sidebar'
import { useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import api from '../../api';

const socket = io.connect("http://localhost:3000");

const Order =  () => {

  const arr =[]
 
  const [orders, setOrders]=useState(arr)

  // const [status, changeStatus]=useState({})


//   const handleInputChange = (e) => {
//     changeStatus({id: e.target.name});
// };
 

  useEffect(()=>{


    

    const showOrders= async()=>{

      try{
  
        const response = await axios.get('http://localhost:3000/api/orders/show');
        // console.log(response.data);
  
  
        setOrders(response.data.orders)
        console.log(response.data.orders);
        // console.log(orders);
       
      
  
  
    
      }catch(error){
        console.error(error)
      }
  
    }

    showOrders();

  },[])


  const ComfirmOrder =async (id) => {



        try{

          const url = `/orders/comfirm?id=${id}`
          const response = await api.get(url);

            console.log(response.data.message);


            
        // Emit the WebSocket event using the existing socket connection
        socket.emit('nouvelle-commande', { message: 'You have new command to delivery!' });


        }catch(err){
            console.error(err);
        }
  };



 





  return (
    <div className='flex'>

      <Sidebar/>
      {/* <ordersTable orders={}/> */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"/>
      <div class="flex flex-wrap -mx-3 mb-5 w-10/12 justify-center">
        <div class="w-full max-w-full px-3 mb-6  mx-auto">
          <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
         
              <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span class="mr-3 font-semibold text-dark">Orders</span>
                  <span class="mt-1 font-medium text-secondary-dark text-lg/normal">All Orders from our clients</span>
                </h3>
              
              </div>
           
              <div class="flex-auto block py-8 pt-6 px-9 max-h-[80vh] overflow-scroll">
                <div class="overflow-x-auto max-h-[80%] ">
                  <table class="w-full my-0 align-middle text-dark border-neutral-200 max-h-[100%] overflow-scroll relative">
                    <thead class="align-bottom sticky top-0">
                      <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                        <th class="pb-3 text-start min-w-[175px]">Orders</th>
                        <th class="pb-3 text-end min-w-[100px]">OWNER</th>
                        <th class="pb-3 text-end min-w-[100px]">PROGRESS</th>
                        <th class="pb-3 pr-12 text-end min-w-[175px]">STATUS</th>
                        <th class="pb-3 pr-12 text-end min-w-[100px]">Date</th>
                        <th class="pb-3 text-end min-w-[50px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>


                      {orders.map((order)=>(

                   

               
                    

             <tr class="border-b border-dashed last:border-b-0">
                        <td class="p-3 pl-0">
                          <div class="flex items-center flex-row">

                            <div class="flex justify-start">
                              <a href="javascript:void(0)" class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"> {order.articles.map(article =>(<span>{article._id.Plat}</span>))}</a>
                            </div>
                          </div>
                        </td>
                        <td class="p-3 pr-0 text-end">
                          <span class="font-semibold text-light-inverse text-md/normal">{order.client.full_name}</span>
                        </td>
                        <td class="p-3 pr-0 text-end">
                          <span class="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg> 6.5% </span>
                        </td>
                        <td class="p-3 pr-12 text-end">
                          <span className={order.status == "Pending" ? "bg-red-200 text-red-900 text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg" : order.status == "InDelivery" ?  "text-orange-800 bg-orange-200 text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg": order.status == "Confirmed" ? "bg-lime-100 text-lime-800 text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg" : "text-primary bg-primary-light text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg" }> {order.status} </span>
                        </td>
                        <td class="pr-0 text-start">
                          <span class="font-semibold text-light-inverse text-md/normal">2023-08-23</span>
                        </td>
                        <td class="p-3 pr-0 text-end flex">
                          <button  className='bg-success text-white rounded p-1' onClick={()=>{ComfirmOrder(order._id)}}>Comfirm</button>
                          <button className='bg-red-600 text-white rounded p-1 m-1'>Delete</button>
                        
                        </td>
              </tr>


))

}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   

    </div>

  )
}


export default Order
