import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/login', { email, password })
            .then(result => {
                console.log(result)
                if (result.data === "Success") {

                    navigate("/")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <section className="vh-100 bg-primary " >
                <div className="container  py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card  shadow-risen shadow shadow-warning shadow-intensity-lg " >
                                <div className="card-body p-5 text-center">
                                    <form action="" onSubmit={handleSubmit} >
                                        <h3 className="mb-5">Log in</h3>

                                        <div className="form-outline mb-4">

                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                className="form-control form-control-lg"
                                                name='email'
                                                placeholder='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg"
                                                name='password'
                                                placeholder='password'
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                        </div>


                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>


                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login