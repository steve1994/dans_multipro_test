import React, { useState, useEffect } from 'react';
import {verifyLogout} from '../services/api';
import Router from 'next/router';

const Header = () => {

    const handleLogout = (event) => {
        event.preventDefault();
        let token = localStorage.getItem("tokenTestDansMultipro");
        verifyLogout(token).then(data => {
            if (data.status === 'success') {
                localStorage.removeItem("tokenTestDansMultipro");
                Router.push('/login');
            }
        })
    }

    return (
        <div className="row h-100 align-items-center p-3" style={{minHeight: '100px', width: '100%', backgroundColor:'blue'}}>
            <div className="col-sm-12 col-md-6 text-left mb-3">
                <img src="/image/github-logo.png" style={{height:'60px'}} />
            </div>
            <div className="col-sm-12 col-md-6 text-right">
                <button onClick={handleLogout} style={{paddingTop:'15px',paddingBottom:'15px',paddingLeft:'30px',paddingRight:'30px'}}>LOGOUT</button>
            </div>
        </div>
    )
}

export default Header
