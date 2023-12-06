import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import Sidebar from "../common/Sidebar";
import io from "socket.io-client";
import OrdersTable from "../common/OrdersTable";
const socket = io.connect("http://localhost:3000");
import api from "../../api";
import { useOrders } from "../../contexts/orderContext";
import "../../assets/styles/manager.css";
import liv from "../../assets/images/liv2.jpg";

const Profile = () => {
  const {
    showOrders,
    showComfirmOrdersToDelivery,
    orders,
    Allorders,
    confirmOrder,
    comfirmOrderFromDelivery,
    deletOrder,
    orderComfirmed,
    orderComfirmed2,
    delete1,
  } = useOrders();

  useEffect(() => {
    showComfirmOrdersToDelivery();
    showOrders();
  }, [orderComfirmed2, orderComfirmed, delete1]);

  const { user, sendVerification, getUser } = useUser();
  const [verificationSent, setVerificationSent] = useState(false);

  const doSendVerification = async () => {
    let response = await sendVerification();
    if (response.status == 200) setVerificationSent(true);
  };

  useEffect(() => {
    getUser();
    console.log(user.role.name);
  }, []);

  return (
    <div className="flex  relative w-full ">
      <img src={liv} className=" absolute top-0 left-0 w-full h-full z-[-1]" />
      {(user.verified && user.role.name == "DeliveryMan") ||
      (user.verified && user.role.name == "Manager") ? (
        <Sidebar />
      ) : (
        ""
      )}

      {!user.verified && (
        <div className="w-full p-28 flex flex-wrap justify-center  gap-28">
          <div className="flex flex-col justify-center items-center gap-5 flex-1">
            {/* <h1 className="font-bold text-3xl">Hello {user.full_name}</h1> */}
            {!user.verified && !verificationSent && (
              <div className="text-brand bg-white py-6 px-28 text-lg font-bold border-l-8 border-green-500 rounded-lg">
                you should verify your account{" "}
              </div>
            )}
            {!user.verified && !verificationSent && (
              <button
                onClick={doSendVerification}
                className="bg-green-500 rounded-lg py-4 px-12 text-white p-3 m-3"
              >
                send email verification
              </button>
            )}
            {!user.verified && verificationSent && (
              <div className="text-brand bg-white py-6 px-28 text-lg font-bold border-l-8 border-green-500 rounded-lg">
                Check your email{" "}
              </div>
            )}
            {/* {user.verified && <div className="text-brand bg-white py-6 px-28 text-lg font-bold border-l-8 border-green-500 rounded-lg">your Account is verified </div>} */}
          </div>
        </div>
      )}

      {user.verified && user.role.name == "DeliveryMan" && (
        <OrdersTable orders={orders} role={user.role.name} />
      )}
      {user.verified && user.role.name == "Manager" && (
        <OrdersTable orders={Allorders} role={user.role.name} />
      )}
    </div>
  );
};

export default Profile;
