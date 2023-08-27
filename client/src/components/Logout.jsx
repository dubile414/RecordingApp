import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();


    const getLogout=()=>{
        axios.post('http://localhost:8000/logout')
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div>
        <button onClick={getLogout} >Logout</button>
    </div>
  )
}

export default Logout