// /app/page.tsx
'use client'
import {useRouter} from "next/navigation";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
    const router = useRouter();
    
    useEffect(() => {
        setTimeout(() => {
            router.push("/auth/login")
        }, );
    }, [router]);

    return (
        <div>
            
        </div>
    );
};

export default HomePage;
