import type { Metadata } from "next";
import {Roboto } from '@next/font/google'
import '@styles/layout.scss'
import Nav from "./nav";
import '@styles/reset.css'
import Home from "./page";
import Warper from "./icon-warp";
import Header from "./header";
import { Path } from "@/assessts/components/path";

export const metadata: Metadata = {
  title: "HCMUT-SSPS",
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
              <header>
                <Header />
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
                        <a className="warp" href={item.url} target="_blank">
                          <img src={item.icon} alt="" />
                        </a>
                      )
                    })
                  }
                </div>
                <div className="layer_2">
                  <span>Copyright &nbsp;
                    <div className="warp"><img src="https://cdn-icons-png.flaticon.com/128/1294/1294340.png" alt="" /></div>
                    &nbsp; 2024, &nbsp;Design By Your Mom </span>
                </div>
              </footer>
            </main>
          </div>
      </body>
    </html>
  );
}
