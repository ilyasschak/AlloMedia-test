import { useState } from 'react'
import { validate } from '../../utils/Validator';
import '../App.css'
import api from '../../api'

const Authentication = () => {
    const [ inputPasswordType, setType ] = useState("password");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const toggleType = ()=>{
    if(inputPasswordType == "password"){
      setType("text")
    }else{
      setType("password")
    }
  }

  const changeEmail = (event) => {
    setEmail(event.target.value)
  }
  const changePassword = (event) => {
    setPassword(event.target.value)
  }
  const login = async (event) => {
    event.preventDefault();

    const { valid, message } = validate({email,password},["email","password"]);
    if(!valid){
      console.log(`message : ${message}`);
    }
    return
    try {
     const data = await api.post('/auth/logout',{email,password})
     if(data.status == 200) console.log("redirect");
     console.log(data);
    } catch (error) {
      
    }
  }
  return (
    <div className='authentication'>
      <form action="" onSubmit={login}>
        <h1>Login To Your Account</h1>
        <div>
          <input type="text" value={email} onChange={()=>changeEmail(event)}  placeholder='Email' />
        </div>
        <div>
          <input type={inputPasswordType} value={password} onChange={()=>changePassword(event)} placeholder='Password' />
          <svg onClick={toggleType} className={inputPasswordType} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
            <path d="M23.821,11.181v0C22.943,9.261,19.5,3,12,3S1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64C1.057,14.739,4.5,21,12,21s10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM12,18a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,18Z"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </div>

        <button className='bg-black py-3' type="submit">Login</button>

        <p>Not Registered Yet? <span>Create An Account</span></p>

      </form>
    </div> 
  )
}

export default Authentication