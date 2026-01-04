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
import CVPDFDocument from "./CVPDFDocument";
import ModernLayout from "./ModernLayout";

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
      layout: <CVPDFDocument styleOptions={styleOptions} />,
    },
    {
      value: "modern",
      label: "Modern",
      layout: <ModernLayout styleOptions={styleOptions} />,
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
                />
              </Card>

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
                    <PDFDownloadLink
                      document={<CVPDFDocument styleOptions={styleOptions} />}
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

// <div className="w-full max-w-4xl">
//                     <div
//                       id="cv-preview"
//                       className="bg-white p-8 rounded-lg shadow-md"
//                       style={{
//                         fontFamily: styleOptions.fontFamily,
//                         fontSize: `${styleOptions.fontSize}px`,
//                       }}
//                     >
//                       {/* Header Section */}
//                       <div
//                         className="text-center mb-8 pb-8"
//                         style={{
//                           borderBottom: `2px solid ${styleOptions.secondaryColor}`,
//                         }}
//                       >
//                         <Title
//                           level={1}
//                           style={{
//                             color: styleOptions.primaryColor,
//                             marginBottom: "8px",
//                           }}
//                         >
//                           {personalInfo.name || "Your Name"}
//                         </Title>
//                         <Title
//                           level={3}
//                           style={{
//                             color: styleOptions.secondaryColor,
//                             marginBottom: "16px",
//                           }}
//                         >
//                           {personalInfo.title || "Your Professional Title"}
//                         </Title>
//                         <Space size="large">
//                           <Space>
//                             <MailOutlined
//                               style={{ color: styleOptions.primaryColor }}
//                             />
//                             <Text strong>
//                               {personalInfo.email || "your.email@example.com"}
//                             </Text>
//                           </Space>
//                           <Space>
//                             <UserOutlined
//                               style={{ color: styleOptions.primaryColor }}
//                             />
//                             <Text strong>Contact Info Here</Text>
//                           </Space>
//                         </Space>
//                       </div>

//                       {/* About Me Section */}
//                       {personalInfo.aboutMe && (
//                         <div className="mb-8">
//                           <Title level={2} className="flex items-center mb-4">
//                             <ProfileOutlined className="mr-2" />
//                             About Me
//                           </Title>
//                           <Paragraph
//                             style={{ fontSize: `${styleOptions.fontSize}px` }}
//                           >
//                             {personalInfo.aboutMe}
//                           </Paragraph>
//                         </div>
//                       )}

//                       {/* Experience Section */}
//                       <div className="mb-8">
//                         <Title level={2} className="flex items-center mb-4">
//                           <ExperimentOutlined className="mr-2" />
//                           Work Experience
//                         </Title>
//                         <div>
//                           {experiences.map((e) => (
//                             <Card key={e.id} className="mb-4">
//                               <Title level={4}>{e.company}</Title>
//                               <Text type="secondary">
//                                 <span>{e.position}</span> • {e.startDate} -{" "}
//                                 {e.current ? "Present" : e.endDate}
//                               </Text>
//                               {e.description && (
//                                 <Paragraph>{e.description}</Paragraph>
//                               )}
//                             </Card>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Education Section */}
//                       <div className="mb-8">
//                         <Title level={2} className="flex items-center mb-4">
//                           <BookOutlined className="mr-2" />
//                           Education
//                         </Title>
//                         <Row gutter={[16, 16]}>
//                           <Col span={12}>
//                             <Card size="small">
//                               <Title level={4}>Computer Science</Title>
//                               <Text strong>University Name</Text>
//                               <br />
//                               <Text type="secondary">
//                                 Bachelor's Degree • 2014 - 2018
//                               </Text>
//                             </Card>
//                           </Col>
//                           <Col span={12}>
//                             <Card size="small">
//                               <Title level={4}>Web Development</Title>
//                               <Text strong>Coding Bootcamp</Text>
//                               <br />
//                               <Text type="secondary">
//                                 Certification • 2018
//                               </Text>
//                             </Card>
//                           </Col>
//                         </Row>
//                       </div>

//                       {/* Skills Section */}
//                       <div>
//                         <Title level={2} className="flex items-center mb-4">
//                           <BulbOutlined className="mr-2" />
//                           Skills
//                         </Title>
//                         <Space size={[8, 16]} wrap>
//                           <Tag color="blue">React</Tag>
//                           <Tag color="blue">TypeScript</Tag>
//                           <Tag color="green">Ant Design</Tag>
//                           <Tag color="green">Tailwind CSS</Tag>
//                           <Tag color="orange">Node.js</Tag>
//                           <Tag color="orange">MongoDB</Tag>
//                           <Tag color="purple">Git</Tag>
//                           <Tag color="purple">AWS</Tag>
//                         </Space>
//                       </div>
//                     </div>
//                   </div>
