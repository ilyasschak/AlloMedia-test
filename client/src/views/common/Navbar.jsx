import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import dkjfjkdf from '../../assets/images/logg.png'

const Navbar = () => {
  const {user, logout,getUser} = useUser();
  const navigate = useNavigate();
  const handleLogout = async()=>{
      let response = await logout();
      if(response.status == 200){
          getUser()
          navigate("/");
      }
          
  }
  return (
    <nav className="bg-transparent border-gray-200 dark:bg-gray-900 shadow-2xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* <a href="" className="flex items-center"> */}
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white logo"> */}
            <img className="w-24" src={dkjfjkdf} alt="" srcset="" />
          {/* </span> */}
        {/* </a> */}

    {/* <a
      href="#tabs-notification"
      class="font-bold relative my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-6 py-3 text-xs  uppercase leading-tight text-[#4b5563] hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-[#2563eb] data-[te-nav-active]:text-[#2563eb] dark:hover:bg-transparent"
      data-te-toggle="pill"
      data-te-target="#tabs-notification"
      role="tab"
      aria-controls="tabs-notification"
      aria-selected="true"
      >Notifications
      <div
        class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
        0
      </div>
    </a> */}
   
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
            
            <NavLink to="">
                <button className=" md:text-white text-lg text-brand px-6 py-2 rounded-xl w-max-content transform scale-100 hover:scale-110 transition-transform">
                    panie
                </button> 
            </NavLink>
            {!user._id && <NavLink to="login">
                <button className=" md:text-white text-lg text-brand px-6 py-2 rounded-xl w-max-content transform scale-100 hover:scale-110 transition-transform">
                    Login
                </button> 
            </NavLink>}
            {!user._id && <NavLink to="/register">
                <button className=" bg-brand text-lg text-white px-6 py-2 rounded-xl w-max-content shadow transform scale-100 hover:scale-110 transition-transform">
                Sign Up
                </button> 
            </NavLink>}
            <a
              href="#tabs-notification"
              class="font-bold relative my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-6 py-3 text-xs  uppercase leading-tight text-[#4b5563] hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-[#2563eb] data-[te-nav-active]:text-[#2563eb] dark:hover:bg-transparent"
              data-te-toggle="pill"
              data-te-target="#tabs-notification"
              role="tab"
              aria-controls="tabs-notification"
              aria-selected="true"
              >Notifications
              <div
                class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-neutral-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                0
              </div>
            </a>
            {/* {user._id && <div>{user.full_name}</div>} */}
            {user._id &&  <NavLink to={'/me'}>
                <button className="bg-orange-600 rounded-md text-white px-3 py-2 mx-1 bg-white">
                    Profile
                </button>
            </NavLink>}
          
            {user._id && <button className=" rounded-md text-brand px-3 py-2 mx-1 bg-white" onClick={handleLogout}>logout</button>}
            {user._id && <button className="bg-orange-600 rounded-md text-white px-3 py-2 mx-1 " onClick={handleLogout}>logout</button>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;