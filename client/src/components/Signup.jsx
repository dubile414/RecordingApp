import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

// mongodb://localhost:27017

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/register',{name,email,password})
        .then(result=>{console.log(result)
            navigate("/login")
        })
        .catch(err=>console.log(err))
    }

    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" >
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Sign in</h2>

                                        <form action="" onSubmit={handleSubmit}>

                                            {/* name  */}

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="text"
                                                    id="typeEmailX"
                                                    className="form-control form-control-lg"
                                                    name='name'
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="typeEmailX">Name</label>
                                            </div>

                                            {/* email */}

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="email"
                                                    id="typeEmailX"
                                                    className="form-control form-control-lg"
                                                    name='email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            </div>

                                            {/* password */}

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="password"
                                                    id="typePasswordX"
                                                    className="form-control form-control-lg"
                                                    name='password'
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>

                                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign In</button>

                                        </form>
                                    </div>
                                    <div>
                                        <p className="mb-0">Do you  have  account? <Link to="/login" className="text-white-50 fw-bold">Login</Link>
                                        </p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup