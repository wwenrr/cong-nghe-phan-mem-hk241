'use client'
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import "@styles/donate.scss"
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import { donate_money } from '@/assessts/function/fetch';



export default function Foo() {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!searchParams.get('money'))
            redirect("/")

        const money = searchParams.get('money');
        const token = Cookies.get('token')
        
        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function foo() {
            //@ts-ignore
            const result = await donate_money(token, parseInt(money, 10));

            console.log(result);
            setLoading(false)

            await sleep(3000);
        }

        foo()
    }, [searchParams]);

    if(searchParams.get('money')) {
        if(loading)
            return(
                <>
                    <div className="pending">
                        <div className="loader">
                            
                        </div>
    
                        <h1>Đang Xử Lí</h1>
                    </div>  
                </>
            )
        else 
            return (
                <>
                    <div className="done">
                        <div className="wrapper"> 
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                            <h1>Thanh Toán Thành Công</h1>
                        </div>
                    </div>
                </>
            )
    }
        
}