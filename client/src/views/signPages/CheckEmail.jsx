import { useState } from "react";
import { useUser } from "../../contexts/userContext";

const Login = () => {
    
  const {user, setUser, login} = useUser();
  const [role, setRole] = useState('Client');


  const handlePasswordChange = e => {
    user.password = event.target.value;
  }

  const handleEmailChange = e => {
    user.email = event.target.value;
  }

  const submit = e => {
      e.preventDefault();
      console.log("validate the inputs"); 
      console.log(user);
      setUser(user) 
      login();
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-screen-xl">
        <h3 className="text-white font-bold text-3xl">Login</h3>
        <form onSubmit={()=>submit(event)} action="" className="bg-white W-full p-16 rounded-2xl flex flex-col gap-6">
            <input type="email" onChange={()=>{handleEmailChange(event)}} placeholder="Email"/>
            <input type="password" onChange={()=> handlePasswordChange(event)} placeholder="Password"/>
            <button type="submit" className="w-full text-white bg-brand">Login</button>
        </form>
    </div>
  )
}

export default Login