import { createContext, useState, useContext } from "react";
import api from "../api";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const orderContext = createContext();


export function OrderProvider({children}){

      const [orders, setOrders] = useState([]);
      const [Allorders, setAllOrders] = useState([]);


     const showOrders = async () => {
       try {
         const url = `/orders/show`;

         const response = await api.get(url);

         console.log(response.data);

         setAllOrders(response.data.orders);
       } catch (error) {
         console.error(error);
       }
     };

        const showComfirmOrdersToDelivery = async () => {
           try {
             const url = `/orders/showComfirmOrdersToDelivery`;
             const response = await api.get(url);

             console.log(response);

             setOrders(response.data.comfirmedOrders);
           } catch (err) {
             console.log(err);
           }
         };




          const ComfirmOrder = async (id) => {
            try {
              const url = `/orders/comfirm?id=${id}`;
              const response = await api.get(url);

              console.log(response.data.OrderComfirmed);

              const orderComfirmed = response.data.OrderComfirmed;

              console.log(orderComfirmed.client.full_name);

              orderComfirmed.articles.map((article) =>
                console.log(article._id.Plat, article._id.prix)
              );

              updateState("stateUpdated");

              socket.emit("nouvelle-commande", { orderComfirmed });
            } catch (err) {
              console.log(err);
            }
          };

          const comfirmOrderFromDelivery = async (id) => {
            try {
              const url = `/orders/comfirmOrderFromDelivery?id=${id}`;
              const response = await api.get(url);

              console.log(response.data.OrderComfirmed);

              const orderComfirmed = response.data.OrderComfirmed;

              console.log(orderComfirmed.client.full_name);

            //   orderComfirmed.articles.map((article) =>
            //     console.log(article._id.Plat, article._id.prix)
            //   );
              socket.emit("recieved notification from delivery", { orderComfirmed });
            } catch (err) {
              console.log(err);
            }
          };

          const deletOrder = async (id) => {
            try {
              const url = `/orders/deleteOrder?id=${id}`;
              const response = await api.get(url);

              console.log(response);
            } catch (err) {
              console.log(err);
            }
          };

         

    return (
      <orderContext.Provider
        value={{
          deletOrder,
          comfirmOrderFromDelivery,
          ComfirmOrder,
          showComfirmOrdersToDelivery,
          showOrders,
          setAllOrders,
          Allorders,
          setOrders,
          orders,
        }}
      >
        {children}
      </orderContext.Provider>
    );

 


}

   export function useOrders() {

    const context = useContext(orderContext);

    return context;


   }