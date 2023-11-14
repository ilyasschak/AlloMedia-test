import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    
  const { user,setToken, verifyEmail,token } = useUser();
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

//   useEffect(async ()=>{
//     const handleVerifyEmail = async () => {
//         if(user.setVerified)  navigate('/me');
//         let token = new URLSearchParams(location.search).get("token");
//         if (token) {
//             setToken(token);
//             let response = await verifyEmail();
//             if(response.status == 200){
//                 setVerified(true)
//             }
//         }
//     }
//     handleVerifyEmail();
//   },[])
useEffect(() => {
    const handleVerifyEmail = async () => {
      if (user.setVerified) {
        navigate('/me');
      }
      const TOKEN = new URLSearchParams(location.search).get("token");
      if (TOKEN) {
        try {
          const response = await verifyEmail(TOKEN);
          console.log(response);
          if (response.status === 200) {
            setVerified(true);
            navigate('/verified')
          }else if(response.status === 400) setMessage("the validation expired");
        } catch (error) {
          console.error("Error verifying email:", error);
        }
      }
    };

    handleVerifyEmail();
  }, []);

  return (
    <div>
        {!verified && !message && <h3 className="bg-white text-brand font-bold text-lg py-6 px-28 border-l-8 border-green-500">still pending</h3>}
        {message && <h3 className="bg-white text-brand font-bold text-lg py-6 px-28 border-l-8 border-green-500">{message}</h3>}
        {verified && <h3 className="bg-white text-brand font-bold text-lg py-6 px-28 border-l-8 border-green-500">verified account</h3>}
    </div>
  )
}

export default VerifyEmail