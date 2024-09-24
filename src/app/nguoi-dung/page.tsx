import React from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/nguoi-dung.module.scss"

export default function() {
    return (
        <>
            <Path />
            
            <div className={style.title}>
                <div className={style.warp}>
                    <img src="https://cdn-icons-png.flaticon.com/128/5683/5683325.png" alt="" />
                </div>
                <span>Thông Tin Cá Nhân</span>
            </div>
            <div className={style.warp}>
                <div className={style.title}>

                </div>

                <div className={style.main}>

                </div>
            </div>
        </>
    )
}