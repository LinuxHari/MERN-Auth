import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logout from "./Forms/Logout";

const Dashboard = () => {
  const token = JSON.parse(localStorage.getItem('token')) || ''
  const [email,setEmail] = useState('')
  const navigate = useNavigate()
  const url = 'http://localhost:8000/authenticate'

  useEffect(() => {
  const authenticate = async() => {
    if(token){
    const authData = {
      method:"POST",
      headers:{'Authorization':`Bearer ${token.token}`}
    }
    const result = await fetch(url,authData)
    if(!result.ok)
      navigate('/login')
    else{
      const data = await result.json()
      setEmail(data)
    }
    }
    else{
      navigate('/login')
    }
  }
  authenticate()
  },[])

  return (
    <>
        <h1>Hello {email}</h1>
        <Logout/>
    </>
  )
}

export default Dashboard