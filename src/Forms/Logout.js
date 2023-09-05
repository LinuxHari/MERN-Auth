import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()
  const doLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='logout'>
        <button className='logout__button' onClick={doLogout}>Logout</button>
    </div>
  )
}

export default Logout