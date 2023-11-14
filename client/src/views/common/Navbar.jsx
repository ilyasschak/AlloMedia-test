import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

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
    <nav className="bg-transparent border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Allo Media
          </span>
        </a>
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
            {user._id && <div>{user.full_name}</div>}
            {user._id &&  <NavLink to={'/me'}>
                <button className=" rounded-md text-brand px-3 py-2 mx-1 bg-white">
                    Profile
                </button>
            </NavLink>}
            {user._id && <button className=" rounded-md text-brand px-3 py-2 mx-1 bg-white" onClick={handleLogout}>logout</button>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;