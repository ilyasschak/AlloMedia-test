import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import dkjfjkdf from "../../assets/images/logg.png";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../../api";
import { FaShoppingCart } from "react-icons/fa";


const socket = io.connect("http://localhost:3000");

const Navbar = () => {
  const {user, logout,getUser, commands} = useUser();
  const [userPanier, setUserPanier] = useState([]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    let response = await logout();
    if (response.status == 200) {
      getUser();
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
    const getPanier = async () => {
      try {
        const response = await api.get("http://localhost:3000/api/cart/panier");
        setUserPanier(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error getting Panier:", error.message);
      }
    };

    getPanier();
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = () => {
    window.location.reload();
  };

  const [notification, setNotification] = useState({
    message: "",
    color: "red",
    num: 0,
  });
  const [client, setClient] = useState("No notification");

  const [notificationDelivery, setNotificationDelivery] = useState({
    message: "",
    color: "red",
    num: 0,
  });
  const [client1, setClient1] = useState("No notification");

  useEffect(() => {
    socket.on("recieved notification", (data) => {
      console.log(data.orderComfirmed.client.full_name);
      setNotification({ message: data.orderComfirmed, color: "red", num: 1 });
      setClient(
        "You have new order to delivery for " +
          data.orderComfirmed.client.full_name
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on("recieved notification from manager", (data) => {
      console.log(data.orderComfirmed.client.full_name);
      setNotificationDelivery({
        message: data.orderComfirmed,
        color: "red",
        num: 1,
      });

      setClient1(
        "The deliveryman start delivering the order for " +
          data.orderComfirmed.client.full_name
      );
    });
  }, [socket]);

  console.log(client1);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-2xl  bg-opacity-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img
          onClick={() => navigate("/")}
          className="w-24"
          src={dkjfjkdf}
          alt=""
          srcset=""
        />
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border items-center  rounded-xl bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {/* {user.role.name == "Client" ? 
                <button className="bg-orange-600 md:text-white text-lg text-brand px-6 py-2 rounded-xl w-max-content transform scale-100 hover:scale-110 transition-transform">
                    panie
                </button> : ""
            } */}

            {!user._id && (
              <NavLink to="login">
                <button className="bg-orange-600 md:text-white text-lg text-brand px-3 py-2 rounded-xl w-max-content transform scale-100 hover:scale-110 transition-transform">
                  Login
                </button>
              </NavLink>
            )}
            {!user._id && (
              <NavLink to="/register">
                <button className=" bg-orange-600 text-lg text-white px-3 py-2 rounded-xl w-max-content shadow transform scale-100 hover:scale-110 transition-transform">
                  Sign Up
                </button>
              </NavLink>
            )}

            {user._id && user.role.name === "Client" && (
              <div className="relative inline-block text-left">
                <div>
                  <NavLink to={"/me"}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Orders
                      <svg
                        className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </NavLink>
                  <div
                    className={
                      notification.message == ""
                        ? "absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white"
                        : "absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white bg-red-600"
                    }
                  >
                    {commands.length}
                  </div>
                </div>
              </div>
            )}

            {user._id && user.role.name === "Client" && (
              <div className="relative inline-block text-left">
                <div>
                  <NavLink to={"/command"}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Commands
                    </button>
                  </NavLink>
                </div>
              </div>
            )}

            
            {user._id && user.role.name === "Client" && (
              <div className="relative inline-block text-left">
                <div>
                  <NavLink to={"/cart"}>
                    <FaShoppingCart size={30} color="#000" />
                  </NavLink>
                </div>
              </div>
            )}

            {user._id && user.role.name === "DeliveryMan" && (
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={handleButtonClick}
                  >
                    Notification
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={
                      notification.message == ""
                        ? "absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white"
                        : "absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white bg-red-600"
                    }
                  >
                    {notification.num}
                  </div>
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                    onClick={handleDropdownClick}
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                      >
                        {client}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {user._id && user.role.name === "Manager" && (
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={handleButtonClick}
                  >
                    Notification
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={
                      notificationDelivery.message == ""
                        ? "absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white"
                        : "absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white bg-red-600"
                    }
                  >
                    {notificationDelivery.num}
                  </div>
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                    onClick={handleDropdownClick}
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                      >
                        {client1}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
            {user._id && (
              <NavLink to={"/me"}>
                <button className="bg-orange-600 rounded-md text-white px-3 py-2 mx-1 ">
                  Profile
                </button>
              </NavLink>
            )}

            {user._id && (
              <button
                className="bg-orange-600 rounded-md text-white px-3 py-2 mx-1 "
                onClick={handleLogout}
              >
                logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
