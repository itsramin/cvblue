import { Button, Card, Row, Col, Steps } from "antd";
import {
  ArrowRightOutlined,
  FormOutlined,
  EyeOutlined,
  DownloadOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  SafetyOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Step } = Steps;

export default function Main() {
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
  ];

  const steps = [
    {
      title: "Fill Details",
      description: "Enter your information in organized sections",
      icon: <FormOutlined />,
    },
    {
      title: "Preview",
      description: "See real-time preview",
      icon: <EyeOutlined />,
    },
    {
      title: "Download",
      description: "Export as PDF",
      icon: <DownloadOutlined />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Improved version */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold  text-gray-900 leading-tight">
                Create Your Perfect Resume in minutes{" "}
                <span className="block font-extrabold text-8xl text-blue-600 mt-2">
                  CV Blue
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Build a professional CV that stands out. Our intuitive builder
                guides you through each section, ensuring you highlight your
                skills and experience effectively. Perfect for job seekers at
                all career levels.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="text-gray-700">
                    Fill in your details section by section
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Preview your CV in real-time
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">
                    Export as PDF with one click
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <Link href={"/form"}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    className="bg-blue-600 hover:bg-blue-700 h-12 px-8"
                  >
                    Start Building Your CV
                  </Button>
                </Link>
                <Link href={"/preview"}>
                  <Button
                    size="large"
                    icon={<EyeOutlined />}
                    className="h-12 px-8"
                  >
                    Preview Template
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 pt-4">
                No registration required. All data is stored locally in your
                browser.
              </p>
            </div>

            {/* Right Column - Visual Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        John Doe
                      </div>
                      <div className="text-blue-600 font-medium">
                        Senior Software Engineer
                      </div>
                    </div>
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-600">
                        JD
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {["Experience", "Education", "Skills", "Projects"].map(
                      (item, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
                        >
                          <div className="text-blue-700 font-bold text-lg">
                            {Math.floor(Math.random() * (10 - 3 + 1)) + 3}
                          </div>
                          <div className="text-gray-700 text-sm">{item}</div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="pt-6">
                    <Button
                      size="large"
                      block
                      type="default"
                      icon={<DownloadOutlined />}
                      className="border-blue-200 text-blue-600 hover:text-blue-700 hover:border-blue-300"
                    >
                      Download PDF Template
                    </Button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-100 rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
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
              <Col xs={24} sm={12} lg={6} key={index}>
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

      {/* How It Works */}
      <div className="px-4 py-16 md:px-10 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Get your professional CV ready in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Steps
              current={0}
              labelPlacement="vertical"
              className="custom-steps"
            >
              {steps.map((step, index) => (
                <Step
                  key={index}
                  title={
                    <div className="text-lg font-semibold mt-4 text-gray-900">
                      {step.title}
                    </div>
                  }
                  description={
                    <div className="text-gray-600 mt-2 max-w-xs mx-auto">
                      {step.description}
                    </div>
                  }
                  icon={
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg">
                      {step.icon}
                    </div>
                  }
                />
              ))}
            </Steps>

            <div className="mt-16 text-center">
              <Link href={"/form"}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                >
                  Start Building Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="px-4 py-16 md:px-10 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <StarOutlined className="text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Winning CV?
          </h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Join thousands of professionals who landed their dream jobs with our
            CV builder. It's free, easy, and takes just minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/form"}>
              <Button
                type="primary"
                size="large"
                className="h-14 px-10 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl"
                icon={<ArrowRightOutlined />}
              >
                Get Started Free
              </Button>
            </Link>
            <Link href={"/preview"}>
              <Button
                size="large"
                className="h-14 px-10 text-lg border-2 border-white text-white hover:bg-white/10"
                icon={<EyeOutlined />}
              >
                View Examples
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-90">
            No credit card • No registration • No hidden fees
          </p>
        </div>
      </div>
    </div>
  );
}
