'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Cookies from 'js-cookie';

export default function NotFoundPage() {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token')

        console.log(token);
        

        if(token)
            router.push("/student/")

        router.push("/auth/login")
    }, [router]);

    return (
        <div className="container my-5 text-center">
            {/* <h1 className="display-4">404 - Không tìm thấy trang</h1>
            <p>Trang bạn tìm không tồn tại. Bạn sẽ được chuyển hướng về trang chủ trong ít giây...</p> */}
        </div>
    );
};
