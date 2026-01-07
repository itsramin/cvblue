import type { Metadata } from "next";
// import {
//   // Geist, Geist_Mono,
//   Vazirmatn,
// } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, Layout } from "antd";
import Header from "@/components/UI/Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const vazir = Vazirmatn({
//   subsets: ["arabic"],
// });

export const metadata: Metadata = {
  title: "CV Blue",
  description: "Build your CV in minutes",
};

{
  /* <body
className={`${geistSans.variable} ${geistMono.variable} antialiased`}
> */
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={"antialiased"}>
        <AntdRegistry>
          <ConfigProvider
          // direction="rtl"
          // theme={{ token: { fontFamily: vazir.style.fontFamily } }}
          >
            <App>
              <div
              // style={{ direction: "rtl" }}
              // className="min-h-screen"
              >
                <Header />

                {children}
              </div>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
