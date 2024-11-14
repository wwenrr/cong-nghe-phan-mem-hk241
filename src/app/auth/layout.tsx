import type { Metadata } from "next";
import {Roboto } from '@next/font/google'
import '@styles/auth/layout.scss'
import React from "react";
import '@styles/reset.css'

export const metadata: Metadata = {
    title: "Xác thực tài khoản",
    description: "Bài Tập Lớn Công Nghệ Phần Mềm HK241",
};

export const viewport = {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
};

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="https://cdn-icons-png.flaticon.com/128/2143/2143615.png"/>
        </head>
        <body>
            {children}
        </body>
        </html>
    );
}
