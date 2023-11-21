import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import Sidebar from '../common/Sidebar'
import axios from 'axios';
import '../../assets/styles/manager.css'
import { useUser } from "../../contexts/userContext";
import Order from './Order'


const socket = io.connect("http://localhost:3000");

const Manager = () => {

  
  const {user, logout,getUser} = useUser();

    // const socket = io('http://localhost:3000');
    socket.on('connect',()=>{
        console.log("connected from react");
    })


  
  const ComfirmOrder =async (e) => {

    e.preventDefault();

        try{

             
            
            const response = await axios.get('http://localhost:3000/api/user/Manager/comfirmOrder');

            console.log(response.data.message);


            
        // Emit the WebSocket event using the existing socket connection
        socket.emit('nouvelle-commande', { message: 'You have new command to delivery!' });


        }catch(err){
            console.error(err);
        }
  };



  

  return (
    // <div>
    //   {/* <button onClick={ComfirmOrder} className='bg-red-700 text-white'>
    //     Comfirmer la commande
    //   </button> */}
    // </div>
<div className='flex'>
  
<Sidebar/>



<div class="flex flex-col w-10/12 items-center mt-20 ">
            <div class="md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#a3a3a3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span class="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            class=" text-orange-600 h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p class="font-dm text-sm font-medium text-gray-600">Earnings</p>
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">$340.5</h4>
                    </div>
                </div>
                <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#a3a3a3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span class="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            class="text-orange-600 h-6 w-6"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M298.39 248a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V236a12 12 0 0012 12z"></path>
                            <path d="M197 267a43.67 43.67 0 01-13-31v-92h-72a64.19 64.19 0 00-64 64v224a64 64 0 0064 64h144a64 64 0 0064-64V280h-92a43.61 43.61 0 01-31-13zm175-147h70.39a4 4 0 002.86-6.8l-78.4-79.72a4 4 0 00-6.85 2.81V108a12 12 0 0012 12z"></path>
                            <path d="M372 152a44.34 44.34 0 01-44-44V16H220a60.07 60.07 0 00-60 60v36h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400h53.05c32.51 0 58.95-26.92 58.95-60V152z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <a href="/dashboard/orders">
                    <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p class="font-dm text-sm font-medium text-gray-600">Orders</p>
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">15</h4>
                    </div>

                    </a>
                   
                </div>
                <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#a3a3a3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span class="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            class="text-orange-600 h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p class="font-dm text-sm font-medium text-gray-600">Sales</p>
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">$574.34</h4>
                    </div>
                </div>
                <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#a3a3a3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span class="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            class="text-orange-600 h-6 w-6"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p class="font-dm text-sm font-medium text-gray-600">Your Balance</p>
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">$1,000</h4>
                    </div>
                </div>
                <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#a3a3a3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span class="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            class="text-orange-600 h-7 w-7"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p class="font-dm text-sm font-medium text-gray-600">New Tasks</p>
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">145</h4>
                    </div>
                </div>
                <div class="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#a3a3a3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div class="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                    <div class="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                        <span class="flex items-center text-brand-500 dark:text-white">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            class="text-orange-600 h-6 w-6"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path>
                        </svg>
                        </span>
                    </div>
                    </div>
                    <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p class="font-dm text-sm font-medium text-gray-600">Total Projects</p>
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">$2433</h4>
                    </div>
                </div>
                </div> 
            {/* <p class="font-normal text-navy-700 mt-20 mx-auto w-max">Profile Card component from <a href="https://horizon-ui.com?ref=tailwindcomponents.com" target="_blank" class="text-brand-500 font-bold">Horizon UI Tailwind React</a></p>   */}
        </div>



</div>

    
  );
};

export default Manager;
