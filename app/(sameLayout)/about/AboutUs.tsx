import { Divider, Button, Tag } from "antd";
import {
  GithubOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { Text, Title, Paragraph } from "@/components/UI/MyText";
import logo from "@/public/images/logo.png";
import Image from "next/image";

export default function AboutUs() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}

        <div className="text-center mb-10 flex flex-col items-center ">
          <Image src={logo} alt="logo" height={60} width={200} />

          <Text type="secondary" className="text-lg">
            Intelligent Resume Management System
          </Text>
          <Tag icon={<InfoCircleOutlined />} color="blue" className="!mt-4">
            Version: <span className="font-bold ml-1">0.3.0</span>
          </Tag>
        </div>

        {/* Main Content Card */}

        <div className="p-6 md:p-8">
          {/* Introduction Section */}
          <div className="mb-10">
            <Title level={2} className="!mb-6 flex items-center gap-3">
              <TeamOutlined className="text-blue-500" />
              About Our Project
            </Title>
            <Paragraph className="text-gray-700 text-lg leading-relaxed">
              CV Blue is a cutting-edge resume management platform designed to
              streamline the job application process. Our mission is to help
              professionals create, manage, and share their resumes effortlessly
              while providing intelligent insights to improve their chances of
              success.
            </Paragraph>
          </div>

          <Divider className="my-8" />

          {/* Design Guide Section */}
          <div className="mb-10">
            <Title level={3} className="!mb-6 flex items-center gap-2">
              <LayoutOutlined className="text-purple-500" />
              Design & Layout Guidelines
            </Title>
            <Paragraph className="text-gray-700 mb-6 max-w-2xl">
              For contributors interested in designing layouts for CV Blue,
              we've prepared comprehensive guidelines covering our design
              system, component library, and layout principles.
            </Paragraph>
            <Button
              type="default"
              size="large"
              icon={<LayoutOutlined />}
              href="https://github.com/itsramin/cvblue/blob/main/components/layouts/layout_readme.md"
              target="_blank"
              className="border-purple-300 text-purple-600 hover:text-purple-700 hover:border-purple-400"
            >
              View Design Guidelines
            </Button>
          </div>

          <Divider className="my-8" />

          {/* GitHub Section */}
          <div className="text-center">
            <Title
              level={3}
              className="!mb-6 flex items-center justify-center gap-2"
            >
              <GithubOutlined />
              Open Source Contribution
            </Title>
            <Paragraph className="text-gray-700 mb-8 max-w-2xl mx-auto">
              CV Blue is an open-source project. We welcome contributions,
              issues, and feedback from the developer community.
            </Paragraph>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="primary"
                size="large"
                icon={<GithubOutlined />}
                href="https://github.com/itsramin/cvblue"
                target="_blank"
                className="bg-gray-900 hover:bg-gray-800 border-0"
              >
                View Repository
              </Button>

              <Button
                type="default"
                size="large"
                icon={<LayoutOutlined />}
                href="https://github.com/itsramin/cvblue/blob/main/components/layouts/layout_readme.md"
                target="_blank"
                className="border-gray-300"
              >
                Design Guide
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t text-center">
            <Text type="secondary" className="text-sm">
              © {new Date().getFullYear()} CV Blue. All rights reserved.
            </Text>
            <div className="mt-2">
              <Text type="secondary" className="text-xs">
                Made with ❤️ by the open-source community
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
