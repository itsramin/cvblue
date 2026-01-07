"use client";

import { useData } from "@/store/store";
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button, Space, Layout, Radio } from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content, Sider } = Layout;

import dynamic from "next/dynamic";
import ClassicLayout from "../../../components/layouts/classis/ClassicLayout";
import ModernLayout from "../../../components/layouts/modern/ModernLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dynamically import PDF components to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

export default function PreviewPage() {
  const { personalInfo, activeCVId } = useData();
  const [activeLayout, setActiveLayout] = useState("classic");

  const nav = useRouter();

  useEffect(() => {
    if (!activeCVId) {
      return nav.push("/dashboard");
    }
  }, [activeCVId]);

  const layouts = [
    {
      value: "classic",
      label: "Classic",
      layout: <ClassicLayout />,
    },
    {
      value: "modern",
      label: "Modern",
      layout: <ModernLayout />,
    },
  ];

  // Generate filename
  const getFilename = () => {
    return `${personalInfo.name || "cv"}_${new Date()
      .toLocaleDateString()
      .replace(/\//g, "-")}.pdf`;
  };

  return (
    <>
      <Sider
        width={300}
        className="!bg-white border-r border-gray-200"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="p-6">
          <Link href={"/form"}>
            <Button block type="primary" icon={<ArrowLeftOutlined />}>
              back to Form
            </Button>
          </Link>
          <Space direction="vertical" size="large" className="w-full mt-6">
            <div>
              <Title level={4} className="flex items-center">
                <SettingOutlined className="mr-2" />
                Style Options
              </Title>
              <Text type="secondary">Customize your CV appearance</Text>
            </div>
            <Card title="Layout">
              <Radio.Group
                value={activeLayout}
                onChange={(e) => setActiveLayout(e.target.value)}
                options={layouts}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              />
            </Card>
          </Space>
        </div>
      </Sider>

      <Content className="p-4 md:p-8 bg-white">
        <Row justify="center">
          <Col xs={24} xl={20} xxl={18}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-semibold">Preview</span>
              <PDFDownloadLink
                document={
                  layouts.find((l) => l.value === activeLayout)?.layout || (
                    <ClassicLayout />
                  )
                }
                fileName={getFilename()}
              >
                {({ loading }) => (
                  <Button
                    icon={<DownloadOutlined />}
                    type="primary"
                    loading={loading}
                    disabled={loading}
                  >
                    {loading ? "Preparing PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
            <div className="h-[600px]">
              <PDFViewer width="100%" height="100%" showToolbar={false}>
                {layouts.find((l) => l.value === activeLayout)?.layout}
              </PDFViewer>
            </div>
          </Col>
        </Row>
      </Content>
    </>
  );
}
