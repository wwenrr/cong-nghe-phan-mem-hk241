'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function NotFoundPage() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 1000);
    }, [router]);

    return (
        <div className="container my-5 text-center">
            <h1 className="display-4">404 - Không tìm thấy trang</h1>
            <p>Trang bạn tìm không tồn tại. Bạn sẽ được chuyển hướng về trang chủ trong ít giây...</p>
        </div>
    );
};
