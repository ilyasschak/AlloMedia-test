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
import SearchRestaurant from "./views/pages/SearchRestaurant.jsx";
import RestaurantsMap from "./views/pages/RestaurantsMap.jsx";
import PopupsController from "./views/common/PopupsController.jsx";
import Menu from "./components/menu/menu";

import Livreur from "./views/Dashboard/Livreur";
import Manager from "./views/Dashboard/Manager";
import Order from "./views/Dashboard/Order";
import ClientOrders from "./views/pages/ClientOrders";

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
        <Route path="/get-users" element={<LiveCoding/>}/>
        <Route path="/menu" element={<Menu/>}/>
      </Route>
      <Route path="/menu" element={<Menu/>}/>

        <Route path="/Dashboard/livreur" element={<Livreur/>}/>
        <Route path="/Dashboard/manager" element={<Manager/>}/>
        <Route path="/Dashboard/orders" element={<Order/>}/>

      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
