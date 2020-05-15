import React, { useState, useEffect } from 'react';
import "~/public/css/users_admin.css"
import {submitRegister, verifyToken} from '../services/api';
import Router from 'next/router';
import Link from 'next/link';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        let token = localStorage.getItem("tokenTestDansMultipro");
        verifyToken(token).then(data => {
            if (data.status === 'success') {
                Router.push('/positions');
            } else {
                alert("Username already registered");
            }
        })
    }, [])

    const handleClickRegister = (event) => {
        event.preventDefault();
        submitRegister(username,password).then(data => {
            if (data.status === 'success') {
                Router.push('/login');
            } else {
                alert('Username already registered');
            }
        })
    }

    return (
        <div id="login">
            <h3 className="text-center text-white pt-5">Register form</h3>
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info">Register</h3>
                                <div className="form-group">
                                    <label for="username" className="text-info">Username:</label><br/>
                                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} name="username" id="username" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="password" className="text-info">Password:</label><br/>
                                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="remember-me" className="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br/>
                                    <input type="submit" onClick={handleClickRegister} name="submit" className="btn btn-info btn-md" value="submit" />
                                </div>
                                <div id="register-link" className="text-right">
                                    <Link href={'/login'}>
                                        <a className="text-info">Already Have Account?</a>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
