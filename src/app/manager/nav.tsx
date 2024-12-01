'use client'

import React, { useEffect, useState } from "react";
import "@styles/nav.scss"
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import useSound from "use-sound";
import Cookies from 'js-cookie';

const menu = [
    {
        logo: "https://cdn-icons-png.flaticon.com/128/1946/1946436.png",
        describe: "Quản Lí",
        url: "/manager"
    },
    {
        logo: "https://cdn-icons-png.flaticon.com/128/3233/3233468.png",
        describe: "Máy In",
        url: "/manager/may-in"
    },
    {
        logo: "https://cdn-icons-png.flaticon.com/128/9746/9746243.png",
        describe: "Tài Liệu",
        url: "/manager/tai-lieu"
    },
    // {
    //     logo: "https://cdn-icons-png.flaticon.com/128/1177/1177568.png",
    //     describe: "Người Dùng",
    //     url: "/manager/nguoi-dung"
    // },
    // {
    //     logo: "https://cdn-icons-png.flaticon.com/128/9195/9195785.png",
    //     describe: "Thông Tin",
    //     url: "/manager/thong-tin"
    // },
]

// ???

export default function Nav() {
    const path = usePathname()

    const isInclude = (e: string):boolean => {
        const lastSegment = path.split('/').pop();

        console.log(lastSegment);

        if(e == '/manager' && lastSegment=='manager') return true;
        else if(e == '/manager')         return false

        return path.includes(e);
    }

    const handleClick = () => {
        const navElement = document.querySelector('.nav');
        if(navElement && window.innerWidth < 600) navElement.classList.toggle('expand');
    }

    const handleClose = () => {
        const navElement = document.querySelector('.nav');
        if(navElement && navElement.classList.contains('expand') && window.innerWidth < 600) {
            navElement.classList.toggle('expand');
        }
    }

    return(
        <>
            <div className="logo_detail">
                {/* <img className="menu" src="https://cdn-icons-png.flaticon.com/128/9073/9073147.png" alt="logo" 
                    onClick={handleClick}
                /> */}
                <img className="logo" src="data:image/jpeg;base64,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" alt="logo" />
                <span>HCMUT-SSPS</span>
            </div>

            <div className="cta">
            {menu.map((item, index) => {
                return (
                    isInclude(item.url) ? (
                        <div key={item.url} className="item active" title={item.describe}>
                            <div className="logo">  
                                <img src={item.logo} alt="logo" />
                            </div>
                            <span>{item.describe}</span>
                        </div>
                    ) : (
                        <Link href={item.url} key={item.url} className="item" onClick={handleClose} title={item.describe}>
                            <div className="logo">
                                <img src={item.logo} alt="logo" />
                            </div>
                            <span>{item.describe}</span>
                        </Link>
                    )
                );
                })}
            </div>

            <div className="warp">
                <img className="menu" src="https://cdn-icons-png.flaticon.com/128/9073/9073147.png" alt="logo" 
                    onClick={handleClick}
                />
            </div>
        </>
    )
}