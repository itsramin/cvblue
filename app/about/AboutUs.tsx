"use client";
import { Divider, Typography, Button, Tag } from "antd";
import {
  GithubOutlined,
  InfoCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function AboutUs() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <Title level={1} className="!mb-2 !text-4xl md:!text-5xl">
            <span className="text-blue-600 font-bold">CV</span>
            <span className="text-gray-800">Blue</span>
          </Title>
          <Text type="secondary" className="text-lg">
            Intelligent Resume Management System
          </Text>
        </div>

        {/* Main Content Card */}

        <div className="p-6 md:p-8">
          {/* Version Badge */}
          <div className="flex justify-end mb-6">
            <Tag
              icon={<InfoCircleOutlined />}
              color="blue"
              className="text-base py-1.5 px-4 rounded-full"
            >
              Version: <span className="font-bold ml-1">0.1.0</span>
            </Tag>
          </div>

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
    </div>
  );
}
