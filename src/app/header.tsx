import React from "react";
import '@styles/header.scss'

export default function Header() {
    return (
    <>
        <div className="title">
            <span>ĐẠI HỌC QUỐC GIA TP.HCM</span>
            <span>TRƯỜNG ĐẠI HỌC BÁCH KHOA</span>
        </div>

        <div className="cta_a">
            <a className="active" href="https://github.com/wwenrr/cong-nghe-phan-mem-hk241/blob/main/README.md" target="_blank" >Dự Án</a>
            <a className="active" href="https://github.com/wwenrr/cong-nghe-phan-mem-hk241/blob/main/README.md" target="_blank">Dịch Vụ</a>
            <a className="active" href="https://github.com/wwenrr/cong-nghe-phan-mem-hk241/blob/main/README.md" target="_blank">Giới Thiệu</a>
            <a className="active" href="https://github.com/wwenrr/cong-nghe-phan-mem-hk241/blob/main/README.md" target="_blank">Liên Hệ</a>
        </div>

        <div className="log_out">
            <img src="https://cdn-icons-png.flaticon.com/128/6619/6619122.png" alt="" 
                title="Log Out"
            />
        </div>
    </>)
}