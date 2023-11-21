import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import axios from 'axios';
import '../../assets/styles/manager.css'
import { useUser } from "../../contexts/userContext";


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
  
<div
id="view"
class=" bg-orange-600 flex flex-row"
x-data="{ sidenav: true }"
>
<button

  class="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
>
  <svg
    class="w-5 h-5 fill-current"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clip-rule="evenodd"
    ></path>
  </svg>
</button>
<div
  id="sidebar"
  class="bg-orange-600 h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
  x-show="sidenav"
 
>
  <div class="space-y-6 md:space-y-10 mt-10">
    <h1 class="font-bold text-4xl text-center md:hidden">
      D<span class="text-teal-600">.</span>
    </h1>
    {/* <h1 class="hidden md:block font-bold text-sm md:text-xl text-center">
      Dashwind<span class="text-teal-600">.</span>
    </h1> */}
    <div id="profile" class="space-y-3">
      <img
        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="Avatar user"
        class="w-10 md:w-16 rounded-full mx-auto"
      />
      <div>
        <h2
          class=" text-white font-bold text-x md:text-sm text-center"
        >
          {user._id && <div>{user.full_name}</div>}
        </h2>
        <p class="text-x text-white text-center">Manager</p>
      </div>
    </div>
    <div
      class="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500"
    >
      <input
        type="text"
        class="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
        placeholder="Search"
      />
      <button
        class="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block"
      >
        <svg
          class="w-4 h-4 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <div id="menu" class="flex flex-col space-y-2">
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          ></path>
        </svg>
        <span class="text-white">Dashboard</span>
      </a>
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
          ></path>
        </svg>
        <span class="text-white">Products</span>
      </a>
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
          <path
            fill-rule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="text-white">Reports</span>
      </a>
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
          ></path>
          <path
            d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
          ></path>
        </svg>
        <span class="text-white">Messages</span>
      </a>
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="text-white">Calendar</span>
      </a>
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="text-white">Table</span>
      </a>
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
          ></path>
        </svg>
        <span class="text-white">UI Components</span>
      </a>
      <a
        href=""
        class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
      >
        <svg
          class="text-white w-6 h-6 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          ></path>
        </svg>
        <span class="text-white">Users</span>
      </a>
    </div>
  </div>
</div>

</div>



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
                    <div class="h-50 ml-4 flex w-auto flex-col justify-center">
                    <p class="font-dm text-sm font-medium text-gray-600">Spend this month</p>
                    <h4 class="text-xl font-bold text-navy-700 dark:text-white">$642.39</h4>
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
