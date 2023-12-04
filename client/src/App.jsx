import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Routes,
} from "react-router-dom";

import "./App.css";
import LandingPage from "./views/pages/LandingPage";
import RootLayout from "./views/RootLayout";
import Login from "./views/signPages/Login";
import SignUp from "./views/signPages/SignUp";
import RegisterSuccess from "./views/pages/RegisterSuccess";
import { useUser } from "./contexts/userContext";
import Profile from "./views/pages/Profile";
import VerifyEmail from "./views/pages/VerifyEmail";
import ResetPassword from "./views/pages/ResetPassword";
import ForgetPassword from "./views/pages/ForgetPassword";
import EmailVerified from "./views/pages/EmailVerified";
import SearchRestaurant from "./views/pages/restaurant/SearchRestaurant.jsx";
import RestaurantsMap from "./views/pages/restaurant/RestaurantsMap.jsx";
import PopupsController from "./views/common/PopupsController.jsx";
import MyMenu from "./components/menu/MyMenu.jsx";
import Cart from "./components/panier/panier";
import Plats from "./components/articles/plat.jsx"
import  Command  from "./components/command/command.jsx";
import RestaurantPage from "./views/pages/restaurant/RestaurantPage.jsx";
import AddMenu from "./components/menu/addMenu.jsx";
import UpdateMenu from "./components/menu/UpdateMenu.jsx";
import ClientOrders from "./views/pages/ClientOrders";
import TrackingMap from "./views/maps/TrackingMap.jsx";
import StartTracking from "./views/common/StartTracking.jsx";

function App() {
  const { user } = useUser();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
      <Route path="/" element={<RootLayout/>}>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={!user._id ? <Login/> : <Navigate to={'/me'}/>} />
        <Route path="/register" element={!user._id ? <SignUp/> : <Navigate to={'/me'}/>} />
        <Route path="/registerSuccess" element={<RegisterSuccess/>}/>
        <Route path="/me" element={user._id ? <Profile/> : <Navigate to={'/login'}/>}/>
        <Route path="/verifyEmail" element={<VerifyEmail/>}/>
        <Route path="/orders" element={<ClientOrders />} />
        <Route path="/verified" element={<EmailVerified/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
        <Route path="/search" element={<SearchRestaurant/>}/>
        <Route path="/map" element={<RestaurantsMap/>}/>
        <Route path="/popup" element={<PopupsController/>}/>
        <Route path="/restaurants/:restaurant_id" element={<RestaurantPage/>} />
        {/* <Route path="/get-users" element={<LiveCoding/>}/> */}
        <Route path ="/addMenu" element={<AddMenu/>}/> 
        <Route path="/myMenu" element={<MyMenu/>}/>
        <Route path="/menu/:id" element = {<UpdateMenu/>} />
        <Route path="/plats/:id" element={<Plats/>}/>
        <Route path="/routing" element={<StartTracking/>}/>
        <Route path="/command" element={<Command/>}/>
        <Route path="/cart" element={<Cart/>}/>

      </Route>
      {/* <Route path="/menu" element={<Menu/>}/> */}
      
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
