import React from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/thong-tin.module.scss"


// Thông Tin Sinh Viên :v
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
                        <span>Tình Trạng Sinh Viên</span>
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
                    <Thong_tin_ca_nhan />
                    <Thong_tin_lien_lac />
                    <Thong_tin_dao_tao />
                    <Thong_tin_sinh_vien />
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