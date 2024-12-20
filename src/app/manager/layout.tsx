import type { Metadata } from "next";
import {Roboto } from '@next/font/google'
import '@styles/layout.scss'
import Nav from "./nav";
import '@styles/reset.css'
import Header from "./header";
import {Path} from "@/assessts/components/path";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { fetch_account, get_manager_account } from "@/assessts/function/fetch";
import { cookies, headers } from "next/headers";

const cta_logo = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/145/145802.png",
    url: "https://www.facebook.com/"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/733/733553.png",
    url: "https://github.com/wwenrr/cong-nghe-phan-mem-hk241"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3955/3955024.png",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3670/3670147.png",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
]

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const headersList = headers();
    const cookieStore = cookies();
    const accessToken = cookieStore.get("token");
    
    if(!accessToken)
        throw new Error("Err")

    const token: string = accessToken.value; 
    
    if(!headersList.get('user-agent'))
        throw new Error("Không Thấy user-agent")

    //@ts-ignore
    const account = await get_manager_account(token, headersList.get('user-agent'));
    
    if(account['account']['role'] === 'manager')
      return (
        <>
          <div className="page_layout">
            <div className="nav">
              <Nav/>
            </div>

            <main>
              <header>
                <Header/>
              </header>

              <section>
                <div className="warper">
                  <Path />
                  {children}
                </div>
              </section>

              <footer>
                <div className="layer_1">
                  {
                    cta_logo.map((item, index) => {
                      return (
                        <a className="warp" href={item.url} target="_blank" key={index}>
                          <img src={item.icon} alt="" />
                        </a>
                      )
                    })
                  }
                </div>
                <div className="layer_2">
                  <span>Copyright &nbsp;
                    <div className="warp"><img src="https://cdn-icons-png.flaticon.com/128/1294/1294340.png" alt="" /></div>
                    &nbsp; 2024, &nbsp;</span>
                </div>
              </footer>
            </main>
          </div>
        </>
  );
      
  } catch (error) {
    //@ts-ignore
    redirect('/');
  }
}