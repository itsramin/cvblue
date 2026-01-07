import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import Header from "@/components/UI/Header";

export const metadata: Metadata = {
  title: "CV Blue - Professional CV Builder | Create ATS-Friendly Resumes",
  description:
    "Create a professional, job-ready CV in under 10 minutes with CV Blue. No sign-up required. Build ATS-friendly resumes, manage multiple CVs, and download as PDF. Your data stays private and secure in your browser.",
  keywords: [
    "CV builder",
    "resume builder",
    "ATS-friendly resume",
    "professional CV",
    "free CV maker",
    "CV templates",
    "job application",
    "career tools",
    "PDF resume",
    "no sign up required",
    "privacy first",
    "multiple CVs management",
    "quick CV creation",
  ],
  authors: [{ name: "CV Blue" }],
  creator: "CV Blue",
  publisher: "CV Blue",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cvblue.vercel.app",
    title: "CV Blue - Create Your Perfect CV in Minutes",
    description:
      "Build a professional CV that stands out in today's competitive job market. Our intuitive builder guides you through each section, ensuring you highlight your skills effectively.",
    siteName: "CV Blue",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "career tools",

  alternates: {
    canonical: "https://cvblue.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={"antialiased"}>
        <AntdRegistry>
          <ConfigProvider>
            <App>
              <div>
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
