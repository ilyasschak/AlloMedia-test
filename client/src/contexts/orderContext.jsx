import { createContext, useState, useContext } from "react";
import api from "../api";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const orderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [Allorders, setAllOrders] = useState([]);

  const [orderComfirmed, setorderComfirmed] = useState("");
  const [orderComfirmed2, setorderComfirmed2] = useState("");

  const [delete1, setdelete] = useState("");

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

  const confirmOrder = async (id) => {
    try {
      const url = `/orders/comfirm?id=${id}`;
      const response = await api.get(url);

      console.log(response.data.OrderComfirmed);

      const orderComfirmed = response.data.OrderComfirmed;

      console.log(orderComfirmed.client.full_name);

      orderComfirmed.articles.map((article) =>
        console.log(article._id.Plat, article._id.prix)
      );

      socket.emit("nouvelle-commande", { orderComfirmed });

      setorderComfirmed(orderComfirmed);
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

      setorderComfirmed2(orderComfirmed);
    } catch (err) {
      console.log(err);
    }
  };

  const deletOrder = async (id) => {
    try {
      const url = `/orders/deleteOrder?id=${id}`;
      const response = await api.get(url);

      setdelete(response.data);

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
        confirmOrder,
        showComfirmOrdersToDelivery,
        showOrders,
        setAllOrders,
        Allorders,
        setOrders,
        orders,
        orderComfirmed,
        orderComfirmed2,
        delete1,
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
