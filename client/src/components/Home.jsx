import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout';
import Navigation from './Navigation';

const Home = () => {

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8000/home')
            .then(result => {
                console.log(result)
                if (result.data !== "Success") {

                    navigate("/login")
                }
            })
            .catch(err => console.log(err))
    }, [])


    return (


        <div>
            <Navigation/>
            <Logout/>

            Home</div>
    )
}

export default Home