"use client";

import { useData } from "@/store/store";
import { useState } from "react";
import { Card, Row, Col, Typography, Button, Space, Layout, Radio } from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content, Sider } = Layout;

import dynamic from "next/dynamic";
import ClassicLayout from "../../components/layouts/classis/ClassicLayout";
import ModernLayout from "../../components/layouts/modern/ModernLayout";
import Header from "@/components/Header";

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
  const { personalInfo } = useData();
  const [activeLayout, setActiveLayout] = useState("classic");

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
      <Header />
      <Layout className="min-h-screen">
        <Sider
          width={320}
          theme="light"
          className="shadow-lg overflow-y-auto"
          style={{ borderRight: "1px solid #f0f0f0" }}
        >
          <div className="p-6">
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Title level={4} className="flex items-center">
                  <SettingOutlined className="mr-2" />
                  CV Style Options
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

        <Layout>
          <Content className="p-8 bg-gray-50">
            <Row justify="center">
              <Col xs={24} xl={20} xxl={18}>
                <Card
                  title={
                    <Space>
                      <EyeOutlined />
                      <span>CV Preview</span>
                    </Space>
                  }
                  extra={
                    <PDFDownloadLink
                      document={
                        layouts.find((l) => l.value === activeLayout)
                          ?.layout || <ClassicLayout />
                      }
                      fileName={getFilename()}
                    >
                      {({ loading, blob, url, error }) => (
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
                  }
                  className="shadow-lg"
                >
                  <div className="h-[600px]">
                    <PDFViewer width="100%" height="100%" showToolbar={false}>
                      {layouts.find((l) => l.value === activeLayout)?.layout}
                    </PDFViewer>
                  </div>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
