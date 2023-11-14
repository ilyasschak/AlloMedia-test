import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/userContext"

const EmailVerified = () => {
const {user} = useUser();

  return (
    
    <div className="w-full p-28 flex flex-col items-center gap-5">
      <div className="flex flex-col gap-3 text-brand bg-white py-6 px-28 text-lg font-bold border-l-8 border-green-500 rounded-lg">
        <h1 className="font-bold text-3xl">you have successfully verified your account </h1>
          {user._id && <NavLink to={'/me'}><button className="bg-green-500 rounded-lg py-4 px-12 text-white p-3 m-3">go to profile</button></NavLink>}
          {!user._id && <NavLink to={'/login'}><button className="bg-green-500 rounded-lg py-4 px-12 text-white p-3 m-3">login</button></NavLink>}
      </div>
    </div>
  )
}

export default EmailVerified