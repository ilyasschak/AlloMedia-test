import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext"

const Profile = () => {
    const {user , sendVerification,getUser} = useUser();
    const [verificationSent, setVerificationSent] = useState(false);
    const doSendVerification = async ()=>{
        let response = await sendVerification();
        if(response.status == 200) setVerificationSent(true)
    }
    useEffect(()=>{getUser();
    console.log(user.role.name);},[]);
  return (
    <div className="w-full p-28 flex flex-wrap justify-center items-center gap-28">
      <div className="flex flex-col justify-center items-center gap-5 flex-1">
        <h1 className="font-bold text-3xl">Hello {user.full_name}</h1>
        {!user.verified && !verificationSent && 
                <div className="text-brand bg-white py-6 px-28 text-lg font-bold border-l-8 border-green-500 rounded-lg">you should verify your account </div>}
        {!user.verified && !verificationSent &&      
                <button onClick={doSendVerification} className="bg-green-500 rounded-lg py-4 px-12 text-white p-3 m-3">
                    send email verification
                </button>
        }
        {!user.verified && verificationSent && <div className="text-brand bg-white py-6 px-28 text-lg font-bold border-l-8 border-green-500 rounded-lg">Check your email </div>}
        {user.verified && <div className="text-brand bg-white py-6 px-28 text-lg font-bold border-l-8 border-green-500 rounded-lg">your Account is verified </div>}
      </div>
      <div className="bg-black p-12 rounded-xl items-center flex flex-col gap-5 flex-1">
        <h1 className="font-bold text-white text-3xl">You are a {user.role.name}</h1>
        {user.role.name == "DeliveryMan" && !user.approved && <h5 className="font-semibold text-white text-xl">You request to be a Delivery man is Pending</h5>}
        {user.role.name == "DeliveryMan" && user.approved && <h5 className="font-semibold text-white text-xl">You request to be a Delivery man has been Accepted</h5>}
      </div>
    </div>
  )
}

export default Profile