// /app/page.tsx
'use client'
import {useRouter} from "next/navigation";
import Cookies from 'js-cookie';
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
    const router = useRouter();
    
    useEffect(() => {
        const token = Cookies.get('token')

        console.log(token);
        
        
        if(token)
            window.location.href = '/student'

        else 
           window.location.href = "/auth/login"
    }, [router]);

    return (
        <div>
            
        </div>
    );
};

export default HomePage;
