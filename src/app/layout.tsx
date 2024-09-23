import type { Metadata } from "next";
import {Roboto } from '@next/font/google'
import '@styles/layout.scss'
import Nav from "./nav";
import '@styles/reset.css'
import Home from "./page";
import Warper from "./icon-warp";

export const metadata: Metadata = {
  title: "HCMUT-SSPS",
  description: "Generated by create next app",
};

export const viewport = {
  name: "viewport",
  content: "width=device-width, initial-scale=1.0"
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/128/2143/2143615.png" />
      </head>
      <body className={roboto.className}>
          <div className="page_layout">
            <div className="nav">
              <Nav />
            </div>

            <main>
              <header>Im a header</header>

              <section>
                {children}
              </section>

              <footer>
                <div className="warp">
                  <div className="img_warp">
                    <img src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoasang.png" alt="" />
                  </div>

                  <span>Trường Đại học Bách Khoa - Tp.HCM</span>
                </div>

                <div className="icon_warp">
                  <Warper />
                </div>
              </footer>
            </main>
          </div>
      </body>
    </html>
  );
}
