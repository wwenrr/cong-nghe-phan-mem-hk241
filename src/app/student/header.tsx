import '@styles/header.scss'
import Logout from "@/assessts/components/Logout";

// @ts-ignore
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

            <Logout />
        </>
    )
}