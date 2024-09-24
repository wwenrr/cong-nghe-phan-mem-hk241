import React from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/thong-tin.module.scss"

function Thong_tin_ca_nhan() {
    return(
        <>
                
            <div className={style.small_box}>
                <div className={style.inner_box}>
                    <span>Thông Tin Cá Nhân</span>
                </div>

                <div className={style.main}>
                    <div className={style.content}>
                        <span>Tên Họ</span>
                        <input type="text" 
                            placeholder="Nguyễn"
                        />
                    </div>

                    <div className={style.content}>
                        <span>Tên Lót</span>
                        <input type="text" 
                            placeholder="Văn"
                        />
                    </div>

                    <div className={style.content}>
                        <span>Tên</span>
                        <input type="text" 
                            placeholder="A"
                        />
                    </div>

                    <div className={style.content}>
                        <span>Giới Tính</span>
                        <select>
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    <div className={style.content}>
                        <span>Ngày Sinh</span>
                        <input type="date" />
                    </div>
                </div>
            </div>
        </>
    )
}

function Thong_tin_lien_lac() {
    return(
        <>
                
            <div className={style.small_box}>
                <div className={style.inner_box}>
                    <span>Thông Tin Liên Lạc</span>
                </div>

                <div className={style.main}>
                    <div className={style.content}>
                        <span>E-Mail</span>
                        <input type="text" 
                            placeholder="abcde@hcmut.edu.vn"
                        />
                    </div>

                    <div className={style.content}>
                        <span>Số Điện Thoại</span>
                        <input type="text" 
                            placeholder="0123456789"
                        />
                    </div>

                    <div className={style.content}>
                        <span>Địa Chỉ</span>
                        <input type="text" 
                            placeholder="123/3 đường Lê Lợi, phường Bến Nghé..."
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

function Thong_tin_sinh_vien() {
    return(
        <>
                
            <div className={style.small_box}>
                <div className={style.inner_box}>
                    <span>Thông Tin Sinh Viên</span>
                </div>

                <div className={style.main}>
                    <div className={style.content}>
                        <span>MSSV</span>
                        <input type="text" 
                            placeholder="2211472 / ..."
                        />
                    </div>

                    <div className={style.content}>
                        <span>Khoa</span>
                        <input type="text" 
                            placeholder="Khoa Học Máy Tính / ..."
                        />
                    </div>

                    <div className={style.content}>
                        <span>Mã Lớp</span>
                        <input type="text" 
                            placeholder="HK03 / ..."
                        />
                    </div>

                    <div className={style.content}>
                        <span>Đơn Vị Quản Lí</span>
                        <input type="text" 
                            placeholder="Khoa Khoa học và Kỹ thuật Máy tính / ..."
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

function Thong_tin_dao_tao() {
    return(
        <>
            <div className={style.small_box}>
                <div className={style.inner_box}>
                    <span>Thông Tin Đào Tạo</span>
                </div>

                <div className={style.main}>
                    <div className={style.content}>
                        <span>Tình trạng sinh viên</span>
                        <input type="text" 
                            placeholder="Đang Học / Thôi Học / ..."
                        />
                    </div>

                    <div className={style.content}>
                        <span>Chương Trình Đào Tạo</span>
                        <input type="text"
                            placeholder="Chính Quy / CLC / ..."
                        />
                    </div>

                    <div className={style.content}>
                        <span>Bậc Đào Tạo</span>
                        <input type="text" 
                            placeholder="Đại Học / Cao Đẳng / ..."
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default function() {
    return (
        <>
            <Path />

            <div className={style.box}>
                <div className={style.title}>
                    <div className={style.warp}>
                        <img src="https://cdn-icons-png.flaticon.com/128/5683/5683325.png" alt="" />
                    </div>
                    <span>Thông Tin Sinh Viên</span>
                </div>
                <div className={style.box_wrapper}>
                    <Thong_tin_ca_nhan />
                    <Thong_tin_lien_lac />
                    <Thong_tin_dao_tao />
                    <Thong_tin_sinh_vien />
                </div>

                <br />
                <br />
                <br />
                <div className={style.title}>
                    <div className={style.warp}>
                        <img src="https://cdn-icons-png.flaticon.com/128/3631/3631163.png" alt="" />
                    </div>
                    <span>Thông Tin Dịch Vụ</span>
                </div>
            </div>
        </>
    )
}