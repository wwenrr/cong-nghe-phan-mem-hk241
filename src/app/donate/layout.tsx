import type { Metadata } from "next";
import {Roboto } from '@next/font/google'
import React from "react";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { fetch_account } from "@/assessts/function/fetch";

export const metadata: Metadata = {
    title: "Trang chủ",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    try {
        const headersList = headers();
        const cookieStore = cookies();
        const accessToken = cookieStore.get("token");
        
        if(!accessToken)
            throw new Error("Err")
    
        const token: string = accessToken.value; 
        
        if(!headersList.get('user-agent'))
            throw new Error("Err")
    
        //@ts-ignore
        const account = await fetch_account(token, headersList.get('user-agent'));
        
        if(account['account']['role'] === 'student')
            return (
                <section>
                    {children}
                </section>
            );
    } catch(err) {
        redirect('/');
    }
}
