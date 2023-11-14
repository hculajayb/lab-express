import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/userServices"


export const UsersPage = () => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    (async () =>{
        const res = await getAllUsers();
        setUsers(res);
    })()
  }, [])
 
  return (
    <div>
        <h1 className='text-center fw-bold'>Usuarios</h1>
        <pre>
            {
                JSON.stringify(users, null, 2)
            }
        </pre>
    </div>
  )
}
