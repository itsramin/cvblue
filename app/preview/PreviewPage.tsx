"use client";

import { useData } from "@/store/store";
import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  ColorPicker,
  Button,
  Space,
  Layout,
  Radio,
} from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content, Sider } = Layout;

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { IStyleOptions } from "@/type/type";
import ClassicLayout from "../../components/layouts/classis/ClassicLayout";
import ModernLayout from "../../components/layouts/modern/ModernLayout";

export default function PreviewPage() {
  const { personalInfo } = useData();
  const [activeLayout, setActiveLayout] = useState("classic");

  // Style options state
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>({
    fontFamily: "Helvetica",
    fontSize: 12,
    primaryColor: "#1890ff",
    secondaryColor: "#52c41a",
  });

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

  // Handle style change
  const handleStyleChange = (key: keyof IStyleOptions, value: any) => {
    setStyleOptions((prev) => ({ ...prev, [key]: value }));
  };

  // Generate filename
  const getFilename = () => {
    return `${personalInfo.name || "cv"}_${new Date().toLocaleString()}.pdf`;
  };

  return (
    <>
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

              {/* <Card title="Colors">
                <Space direction="vertical" size="middle" className="w-full">
                  <Space direction="vertical" size="middle" className="w-full">
                    <Text strong>Primary Color</Text>
                    <ColorPicker
                      value={styleOptions.primaryColor}
                      onChange={(color) =>
                        handleStyleChange("primaryColor", color.toHexString())
                      }
                      showText
                      size="large"
                    />
                  </Space>
                  <Space direction="vertical" size="middle" className="w-full">
                    <Text strong>Secondary Color</Text>
                    <ColorPicker
                      value={styleOptions.secondaryColor}
                      onChange={(color) =>
                        handleStyleChange("secondaryColor", color.toHexString())
                      }
                      showText
                      size="large"
                    />
                  </Space>
                </Space>
              </Card> */}
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
                      {({ loading }) => (
                        <Button
                          icon={<DownloadOutlined />}
                          type="primary"
                          loading={loading}
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
