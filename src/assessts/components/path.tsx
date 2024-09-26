'use client'
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import style from "@styles/path.module.scss"
import { usePathname } from "next/navigation";

export interface tuble {
    name: string,
    url: string
}

export interface props {
    arr: Array<tuble>
}

const maping:Record<string, string> & { default: string } = {
    "/": "Trang Chủ",
    "thong-tin": "Thông Tin",
    "may-in": "Máy In",
    "nguoi-dung": "Người Dùng",
    "tai-lieu": "Tài Liệu",

    default: "not found!"
}

type MappingKeys = string;

// const path_test:string = "/thong-tin"

export function Path() {
    const path = usePathname()
    // const path = path_test
    const [arr, setArr] = useState<Array<tuble>>([])

    useEffect (() => {
        const segments = path.split('/').filter(segment => segment);

        const arr: Array<tuble> = segments.map((segment, index) => ({
                name: segment,
                url: `/${segments.slice(0, index + 1).join('/')}` 
            })
        );

        arr.unshift({
            name: "/",
            url: "/"
        })

        setArr(prev => arr)
    }, [path])

    useEffect(() => {
        // console.log(arr)
    }, [arr])

    return (
     <>
        {arr && <div className={style.path}>
            {arr.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <Link href={item.url} className={style.link}  key={index}>
                            {maping[item.name]}
                        </Link>
                        {index !== arr.length - 1 &&
                            <div className={style.warp} key={index}>
                                <div className={style.img_warp}>
                                    <img src="https://cdn-icons-png.flaticon.com/128/3585/3585438.png" alt="" />
                                </div>
                            </div>
                        }
                    </React.Fragment>
                );
            })}
        </div>}
     </>
   )
 }