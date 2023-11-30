import { useEffect, useState } from "react"
// import MapModal from "./MapModal";
import { useUser } from "../../contexts/userContext"
import api from "../../api"
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000");
import {useOrders} from "../../contexts/orderContext";

const OrdersTable = ({orders, role}) => {

  // const { ComfirmOrder, comfirmOrderFromDelivery, deletOrder } = useOrders();

  const calculateThePrice = articles => {
    let count = 0;
    articles.forEach(article =>{
        count+= article._id.prix * article.quantite
    })
    return count 
  }
  const {user , sendVerification,getUser} = useUser(); 
  
  // function handelComfirmOrder(id){
  //   ComfirmOrder(id)
  // }
  //  function handelcomfirmOrderFromDelivery(id) {
  //    comfirmOrderFromDelivery(id);
  //  }

  //   function handeldeletOrder(id) {
  //     deletOrder(id);
  //   }


  const ComfirmOrder =async (id) => {



    try{

      const url = `/orders/comfirm?id=${id}`
      const response = await api.get(url);

        console.log(response.data.OrderComfirmed);

        const orderComfirmed = response.data.OrderComfirmed;

        console.log(orderComfirmed.client.full_name)

        orderComfirmed.articles.map(article => (
          console.log(article._id.Plat, article._id.prix )

          
        ))


        socket.emit('nouvelle-commande', { orderComfirmed });


    }catch(err){
       console.log(err);
    }
  };

  const comfirmOrderFromDelivery =async (id) => {
    try{

      const url = `/orders/comfirmOrderFromDelivery?id=${id}`
      const response = await api.get(url);

        console.log(response.data.OrderComfirmed);

        const orderComfirmed = response.data.OrderComfirmed;

        console.log(orderComfirmed.client.full_name)

        orderComfirmed.articles.map(article => (
          console.log(article._id.Plat, article._id.prix )
        ))
        socket.emit('recieved notification from delivery', { orderComfirmed });


    }catch(err){
      console.log(err);
    }
  };


  const deletOrder = async(id)=>{
    try{

    const url = `/orders/deleteOrder?id=${id}`;
    const response = await api.get(url);

    console.log(response);

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="w-3/4">
      {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"/> */}
      <div className="flex flex-wrap -mx-3 mb-5 justify-center ">
        <div className=" px-3 mb-6  mx-auto">
          <div className=" relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">Orders</span>
                  {role == "manager" && (
                    <span className="mt-1 font-medium text-neutral-400 text-lg/normal">
                      All Orders from our clients
                    </span>
                  )}
                  {role == "client" && (
                    <span className="mt-1 font-medium text-neutral-400 text-lg/normal">
                      All Orders i have made
                    </span>
                  )}
                  {role == "DeliveryMan" && (
                    <span className="mt-1 font-medium text-neutral-400 text-lg/normal">
                      All Orders you should delivery
                    </span>
                  )}
                </h3>
              </div>

              <div className="flex-auto block py-8 pt-6 px-9 max-h-[80vh] overflow-scroll ">
                <div className="overflow-x-auto max-h-[80%]">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.90rem] text-neutral-400">
                        <th className="pb-3 text-start min-w-[175px]">
                          Orders
                        </th>
                        <th className="pb-3 text-end min-w-[100px]">
                          ARTICLES
                        </th>
                        <th className="pb-3 text-end min-w-[100px]">Owner</th>
                        {role == "DeliveryMan" ||
                          (role == "Manager" && (
                            <th className="pb-3 text-end min-w-[100px]">
                              Phone number
                            </th>
                          ))}
                        <th className="pb-3 text-end min-w-[100px]">
                          TOTAL PRICE
                        </th>
                        {role == "Manager" || role == "Client" ? (
                          <th className="pb-3 pr-12 text-end min-w-[175px]">
                            STATUS
                          </th>
                        ) : (
                          ""
                        )}

                        <th className="pb-3 text-end min-w-[50px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr
                          key={index}
                          className="border-b border-dashed last:border-b-0 hover:bg-green-100 text-[0.90rem]"
                        >
                          <td className="p-3 pl-0">
                            <div className="flex items-center">
                              <div className="flex flex-col justify-start">
                                {order.articles.map((article, index2) => (
                                  <a
                                    key={index2 + orders.length}
                                    href="#"
                                    className="mb-1 font-semibold transition-colors duration-200 ease-in-out  text-[0.90rem] text-secondary-inverse hover:text-primary"
                                  >
                                    {" "}
                                    {article._id.Plat}{" "}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </td>

                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {order.articles.length}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {order.client ? order.client.full_name : "inkonu"}
                            </span>
                          </td>

                          {role == "DeliveryMan" ||
                            (role == "Manager" && (
                              <td className="p-3 pr-0 text-end">
                                <span className="font-semibold text-light-inverse text-md/normal">
                                  {order.client
                                    ? order.client.phone_number
                                    : "no number"}
                                </span>
                              </td>
                            ))}
                          <td className="p-3 pr-0 text-end">
                            {calculateThePrice(order.articles)}
                          </td>

                          {user.role.name == "Manager" || role == "Client" ? (
                            <td className="p-3 pr-0 text-end">
                              {" "}
                              <span
                                className={
                                  order.status == "Pending"
                                    ? "bg-red-200 text-red-900 text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg"
                                    : order.status == "InDelivery"
                                    ? "text-orange-800 bg-orange-200 text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg"
                                    : order.status == "Confirmed"
                                    ? "bg-lime-100 text-lime-800 text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg"
                                    : "text-blue-600 bg-blue-100 text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg"
                                }
                              >
                                {" "}
                                {order.status}{" "}
                              </span>{" "}
                            </td>
                          ) : (
                            ""
                          )}

                          {user.role.name == "Client" ? (
                            <td className="p-3 pr-0 gap-3 text-end flex justify-end">
                              <button
                                onClick={() => {
                                  setMapOpen(true);
                                }}
                                className="text-gray-400 bg-gray-100 hover:text-blue-800 focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                              >
                                <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,12,6ZM16,22.03l8,1.948V13.483a3,3,0,0,0-2.133-2.871l-2.1-.7A8.037,8.037,0,0,0,20,8.006a8,8,0,0,0-16,0,8.111,8.111,0,0,0,.1,1.212A2.992,2.992,0,0,0,0,12v9.752l7.983,2.281ZM7.757,3.764a6,6,0,0,1,8.493,8.477L12,16.4,7.757,12.249a6,6,0,0,1,0-8.485ZM2,12a.985.985,0,0,1,.446-.832A1.007,1.007,0,0,1,3.43,11.1l1.434.518a8.036,8.036,0,0,0,1.487,2.056L12,19.2l5.657-5.533a8.032,8.032,0,0,0,1.4-1.882l2.217.741a1,1,0,0,1,.725.961v7.949L16,19.97l-7.98,2L2,20.246Z" />
                                  </svg>
                                </span>
                              </button>
                            </td>
                          ) : user.role.name == "DeliveryMan" ? (
                            <td className="p-3 pr-0 flex justify-center items-center">
                              <button
                                className="bg-green-700 text-white rounded p-1"
                                onClick={() => {
                                  comfirmOrderFromDelivery(order._id);
                                }}
                              >
                                Comfirm
                              </button>
                            </td>
                          ) : (
                            ""
                          )}

                          {role == "Manager" && (
                            <td class="p-3 pr-0 text-end  text-[0.90rem]">
                              {order.status == "Pending" ? (
                                <button
                                  className="bg-green-700 text-white rounded p-1"
                                  onClick={() => {
                                    ComfirmOrder(order._id);
                                  }}
                                >
                                  Comfirm
                                </button>
                              ) : (
                                ""
                              )}
                              <button
                                className="bg-red-600 text-white rounded p-1 m-1"
                                onClick={() => {
                                  deletOrder(order._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersTable