"use client";

import Education from "@/components/formSections/Education";
import Languages from "@/components/formSections/Languages";
import PersonalInfo from "@/components/formSections/Personal";
import Projects from "@/components/formSections/Projects";
import Skills from "@/components/formSections/Skills";
import WorkExperience from "@/components/formSections/WorkExperience";
import { Menu, Layout } from "antd";
import { useState } from "react";
import {
  UserOutlined,
  BuildOutlined,
  BookOutlined,
  CodeOutlined,
  GlobalOutlined,
  ProjectOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import Backup from "@/components/Backup";

const { Sider, Content } = Layout;

export default function FormPage() {
  const [activeSection, setActiveSection] = useState<string>("personal");

  // Define menu items separately without React components
  const menuItems = [
    {
      key: "personal",
      icon: <UserOutlined />,
      label: "Personal Information",
    },
    {
      key: "experience",
      icon: <BuildOutlined />,
      label: "Work Experience",
    },
    {
      key: "education",
      icon: <BookOutlined />,
      label: "Education",
    },
    {
      key: "skills",
      icon: <CodeOutlined />,
      label: "Skills",
    },
    {
      key: "languages",
      icon: <GlobalOutlined />,
      label: "Languages",
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: "Projects",
    },
    {
      type: "divider" as const,
    },
    {
      key: "backup",
      icon: <DatabaseOutlined />,
      label: "Backup",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    setActiveSection(key);
  };

  // Map the active section to its component
  const getActiveComponent = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfo />;
      case "experience":
        return <WorkExperience />;
      case "education":
        return <Education />;
      case "skills":
        return <Skills />;
      case "languages":
        return <Languages />;
      case "projects":
        return <Projects />;
      case "backup":
        return <Backup />;

      default:
        return <PersonalInfo />;
    }
  };

  return (
    <Layout className="!min-h-[calc(100vh-84px)]">
      {/* <Header /> */}

      <Layout className=" p-2 md:p-10 ">
        <Sider
          width={250}
          className="!bg-white border-r border-gray-200"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            selectedKeys={[activeSection]}
            onClick={handleMenuClick}
            className="border-0"
            items={menuItems}
          />
        </Sider>
        <Content className="p-8 bg-white">{getActiveComponent()}</Content>
      </Layout>
    </Layout>
  );
}
