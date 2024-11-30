'use client'
import React, { useEffect, useState } from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/thong-tin.module.scss"
import Cookies from "js-cookie";
import { get_info } from "@/assessts/function/fetch";


// Thông Tin Sinh Viên :v
function Thong_tin_ca_nhan({info}:any) {
    console.log(info);

    return(
        <>
                
            <div className={style.small_box}>
                <div className={style.inner_box}>
                    <span>Thông Tin Cá Nhân</span>
                </div>

                <div className={style.main}>
                    <div className={style.content}>
                        <span>Họ Tên</span>
                        <input type="text" 
                            value={info['name']}
                            disabled={true}
                        />
                    </div>

                    <div className={style.content}>
                        <span>Email</span>
                        <input type="text" 
                            value={info['email']}
                            disabled={true}
                        />
                    </div>

                    <div className={style.content}>
                        <span>Số Điện Thoại</span>
                        <input type="text" 
                            value={info['phone']}
                            disabled={true}
                        />
                    </div>

                    <div className={style.content}>
                        <span>Vai Trò</span>
                        <input type="text" 
                            value={info['role']}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

// Thông Tin Dịch Vụ :v

function Thong_tin_dich_vu() {
    return(
        <>
            <div className={style.small_box}>
                <div className={style.inner_box}>
                    <span>HCMUT - SSPS</span>
                </div>

                <div className={style.main}>
                    <div className={style.content}>
                        <span>Loại Hình Dịch Vụ: 
                            <b>In Ấn</b> 
                        </span>

                        <hr className={style.custom_line} />
                    </div>

                    <div className={style.content}>
                        <span>Đối Tượng Phục Vụ
                            <b>
                                Sinh Viên Các Hình Thức Đào Tạo
                            </b>
                        </span>

                        <hr className={style.custom_line} />
                    </div>

                    <div className={style.content}>
                        <span>Thời Gian Hoạt Động:
                            <b>
                                Thứ 2 - Thứ 7, 8h00 - 18h00
                            </b>
                        </span>

                        <hr className={style.custom_line} />
                    </div>

                    <div className={style.content}>
                        <span>Phạm Vi Dịch Vụ:
                            <b>
                                Nội Bộ Trường Đại Học Bách Khoa Tp.Hcm
                            </b>
                        </span>

                        <hr className={style.custom_line} />
                    </div>

                    <div className={style.content}>
                        <span>Hình Thức Thanh Toán:
                            <b>
                                Chuyển khoản, tiền mặt
                            </b>
                        </span>

                        <hr className={style.custom_line} />
                    </div>

                    <div className={style.content}>
                        <span> Chính Sách Bảo Hành:
                            <b>
                                Không
                            </b>
                        </span>

                        <hr className={style.custom_line} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default function() {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        async function foo() {
            const token = Cookies.get('token')
            let info

            if(token)
                info = await get_info(token);

            setInfo(info['account'])
        }

        foo()
    }, [])

    if(info)
        return (
            <>
                <div className={style.box}>
                    <div className={style.title}>
                        <div className={style.warp}>
                            <img src="https://cdn-icons-png.flaticon.com/128/5683/5683325.png" alt="" />
                        </div>
                        <span>Thông Tin Sinh Viên</span>
                    </div>
                    <div className={style.box_wrapper}>
                        <Thong_tin_ca_nhan info={info}/>
                    </div>

                    <br />
                    <br />
                    <br />
                    <p></p>

                    <div className={style.title}>
                        <div className={style.warp}>
                            <img src="https://cdn-icons-png.flaticon.com/128/3631/3631163.png" alt="" />
                        </div>
                        <span>Thông Tin Dịch Vụ</span>
                    </div>

                    <div className={style.box_wrapper}>
                        <Thong_tin_dich_vu />
                    </div>
                </div>
            </>
        )
}