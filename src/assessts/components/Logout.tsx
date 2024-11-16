'use client'
import React from "react";
import Cookies from 'js-cookie';

export default function Logout() {
    const hanleClick = () => {
        Cookies.remove('token');

        window.location.href = '/';
    }

    return (
        <div className="log_out" onClick={hanleClick}>
            <img src="https://cdn-icons-png.flaticon.com/128/6619/6619122.png" alt="" 
                title="Log Out"
            />
        </div>
    )
}