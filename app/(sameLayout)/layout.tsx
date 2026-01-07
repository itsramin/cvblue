import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, Layout } from "antd";

export const metadata: Metadata = {
  title: "CV Blue",
  description: "Build your CV in minutes",
};

{
  /* <body
className={`${geistSans.variable} ${geistMono.variable} antialiased`}
> */
}

export default function WithHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      <ConfigProvider>
        <App>
          <Layout className="p-4 md:p-10 !min-h-[calc(100vh-86px)]">
            {children}
          </Layout>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
