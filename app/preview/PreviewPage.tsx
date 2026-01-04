"use client";

import { useData } from "@/store/store";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  Card,
  Row,
  Col,
  Typography,
  ColorPicker,
  Button,
  Space,
  Layout,
  Tag,
  message,
} from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  SettingOutlined,
  UserOutlined,
  MailOutlined,
  ProfileOutlined,
  BookOutlined,
  ExperimentOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Content, Sider } = Layout;

// Define styling options interface
interface StyleOptions {
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
}

export default function PreviewPage() {
  const { data } = useData();
  const [messageApi, contextHolder] = message.useMessage();

  // Style options state
  const [styleOptions, setStyleOptions] = useState<StyleOptions>({
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    primaryColor: "#1890ff",
    secondaryColor: "#52c41a",
  });

  // Handle style change
  const handleStyleChange = (key: keyof StyleOptions, value: any) => {
    setStyleOptions((prev) => ({ ...prev, [key]: value }));
  };

  // Generate PDF
  const generatePDF = async () => {
    const input = document.getElementById("cv-preview");
    if (!input) {
      messageApi.error("Preview content not found");
      return;
    }

    messageApi.loading({
      content: "Generating PDF...",
      key: "pdf",
      duration: 0,
    });

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("cv-preview");
          if (clonedElement) {
            // Ensure proper styling for PDF
            clonedElement.style.boxShadow = "none";
            clonedElement.style.padding = "40px";
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new page if content is too long
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = `${data.name || "cv"}_${new Date().getTime()}.pdf`;
      pdf.save(filename);

      messageApi.success({
        content: "PDF downloaded successfully!",
        key: "pdf",
        duration: 3,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      messageApi.error({
        content: "Failed to generate PDF. Please try again.",
        key: "pdf",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
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

              <Card title="Colors">
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
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={generatePDF}
                      type="primary"
                    >
                      Download
                    </Button>
                  }
                  className="shadow-lg"
                >
                  <div className="flex justify-center  rounded-lg">
                    <div
                      id="cv-preview"
                      className="bg-white w-full max-w-4xl"
                      style={{
                        fontFamily: styleOptions.fontFamily,
                        fontSize: `${styleOptions.fontSize}px`,
                        color: styleOptions.primaryColor,
                      }}
                    >
                      {/* Header Section */}
                      <div
                        className="text-center mb-8 pb-8"
                        style={{
                          borderBottom: `2px solid ${styleOptions.secondaryColor}`,
                        }}
                      >
                        <Title
                          level={1}
                          style={{
                            color: styleOptions.primaryColor,
                            marginBottom: "8px",
                          }}
                        >
                          {data.name || "Your Name"}
                        </Title>
                        <Title
                          level={3}
                          style={{
                            color: styleOptions.secondaryColor,
                            marginBottom: "16px",
                          }}
                        >
                          {data.title || "Your Professional Title"}
                        </Title>
                        <Space size="large">
                          <Space>
                            <MailOutlined
                              style={{ color: styleOptions.primaryColor }}
                            />
                            <Text strong>
                              {data.email || "your.email@example.com"}
                            </Text>
                          </Space>
                          <Space>
                            <UserOutlined
                              style={{ color: styleOptions.primaryColor }}
                            />
                            <Text strong>Contact Info Here</Text>
                          </Space>
                        </Space>
                      </div>

                      {/* About Me Section */}
                      {data.aboutMe && (
                        <div className="mb-8">
                          <Title level={2} className="flex items-center mb-4">
                            <ProfileOutlined className="mr-2" />
                            About Me
                          </Title>
                          <Paragraph
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            {data.aboutMe}
                          </Paragraph>
                        </div>
                      )}

                      {/* Experience Section */}
                      <div className="mb-8">
                        <Title level={2} className="flex items-center mb-4">
                          <ExperimentOutlined className="mr-2" />
                          Work Experience
                        </Title>
                        <Card size="small" className="mb-4">
                          <Title level={4}>Senior Developer</Title>
                          <Text type="secondary">
                            Tech Company Inc. • 2020 - Present
                          </Text>
                          <Paragraph>
                            Led a team of 5 developers in creating scalable web
                            applications. Implemented CI/CD pipelines reducing
                            deployment time by 40%.
                          </Paragraph>
                        </Card>
                        <Card size="small">
                          <Title level={4}>Frontend Developer</Title>
                          <Text type="secondary">
                            Digital Agency • 2018 - 2020
                          </Text>
                          <Paragraph>
                            Developed responsive web applications using React
                            and TypeScript. Collaborated with design teams to
                            implement pixel-perfect UIs.
                          </Paragraph>
                        </Card>
                      </div>

                      {/* Education Section */}
                      <div className="mb-8">
                        <Title level={2} className="flex items-center mb-4">
                          <BookOutlined className="mr-2" />
                          Education
                        </Title>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <Card size="small">
                              <Title level={4}>Computer Science</Title>
                              <Text strong>University Name</Text>
                              <br />
                              <Text type="secondary">
                                Bachelor's Degree • 2014 - 2018
                              </Text>
                            </Card>
                          </Col>
                          <Col span={12}>
                            <Card size="small">
                              <Title level={4}>Web Development</Title>
                              <Text strong>Coding Bootcamp</Text>
                              <br />
                              <Text type="secondary">Certification • 2018</Text>
                            </Card>
                          </Col>
                        </Row>
                      </div>

                      {/* Skills Section */}
                      <div>
                        <Title level={2} className="flex items-center mb-4">
                          <BulbOutlined className="mr-2" />
                          Skills
                        </Title>
                        <Space size={[8, 16]} wrap>
                          <Tag
                            color="blue"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            React
                          </Tag>
                          <Tag
                            color="blue"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            TypeScript
                          </Tag>
                          <Tag
                            color="green"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            Ant Design
                          </Tag>
                          <Tag
                            color="green"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            Tailwind CSS
                          </Tag>
                          <Tag
                            color="orange"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            Node.js
                          </Tag>
                          <Tag
                            color="orange"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            MongoDB
                          </Tag>
                          <Tag
                            color="purple"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            Git
                          </Tag>
                          <Tag
                            color="purple"
                            style={{ fontSize: `${styleOptions.fontSize}px` }}
                          >
                            AWS
                          </Tag>
                        </Space>
                      </div>
                    </div>
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
