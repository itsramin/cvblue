import { Card, Row, Col } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  SafetyOutlined,
  CopyOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

export default function FeaturesSetion() {
  const features = [
    {
      icon: <FileTextOutlined />,
      title: "Professional Templates",
      description: "Multiple ATS-friendly designs to choose from",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <ClockCircleOutlined />,
      title: "Quick & Easy",
      description: "Create a job-ready CV in under 10 minutes",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: <CheckOutlined />,
      title: "No Sign Up Required",
      description: "Start building immediately, no registration",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: <SafetyOutlined />,
      title: "Privacy First",
      description: "Your data stays in your browser",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: <FolderOpenOutlined />,
      title: "Multiple CVs Management",
      description:
        "Create, duplicate, and manage different CVs for different companies",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: <CopyOutlined />,
      title: "Easy Duplication",
      description:
        "Quickly duplicate and customize CVs for different job applications",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];
  return (
    <div className="px-4 py-16 md:px-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for a Perfect CV
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Designed to help you stand out in today's competitive job market
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                className="h-full border-0 shadow-lg hover:shadow-2xl !transition-all !duration-500 hover:-translate-y-1"
                hoverable
              >
                <div
                  className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}
                >
                  <div className={`text-xl ${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
