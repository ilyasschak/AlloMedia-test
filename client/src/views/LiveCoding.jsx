import { useEffect, useState } from "react"
import api from "../api";

const LiveCoding = () => {
    const [users, setUsers] = useState([]);
    const [tbody,setTbody] = useState(null)
    const handleUsersComing = ()=>{
        var tableData = users.map(function(obj) {
            return (
                <tr>
                    <td className="text-center bg-white">{obj.full_name}</td>
                    <td className="text-center bg-white">{obj.email}</td>
                    <td className="text-center bg-white">{obj.phone_number}</td>
                </tr>)
        })
        setTbody(tableData);
    }
    useEffect(()=>{
        api.get('/auth/get-users')
        .then(res =>{ 
            setUsers(res.data.users)
            handleUsersComing();
        });

    },[])
  return (
    <div className="text-3xl">
    {!users.length && <h3 className="text-center">Loading</h3>}
    {users.length && <table className="w-full">
        <thead>
            <th>full name</th>
            <th>email</th>
            <th>phone_number</th>
        </thead>
        <tbody>
            {tbody}
        </tbody>
    </table>
    }
    </div>
  )
}

export default LiveCoding