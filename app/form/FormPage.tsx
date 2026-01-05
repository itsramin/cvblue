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
} from "@ant-design/icons";
import Header from "@/components/Header";

const { Sider, Content } = Layout;

export default function FormPage() {
  const [activeSection, setActiveSection] = useState<string>("personal");

  const menuItems = [
    {
      key: "personal",
      icon: <UserOutlined />,
      label: "Personal Information",
      component: <PersonalInfo />,
    },
    {
      key: "experience",
      icon: <BuildOutlined />,
      label: "Work Experience",
      component: <WorkExperience />,
    },
    {
      key: "education",
      icon: <BookOutlined />,
      label: "Education",
      component: <Education />,
    },
    {
      key: "skills",
      icon: <CodeOutlined />,
      label: "Skills",
      component: <Skills />,
    },
    {
      key: "languages",
      icon: <GlobalOutlined />,
      label: "Languages",
      component: <Languages />,
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: "Projects",
      component: <Projects />,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    setActiveSection(key);
  };

  const activeComponent = menuItems.find(
    (item) => item.key === activeSection
  )?.component;

  return (
    <Layout className="!min-h-screen">
      <Header />

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
            items={menuItems.map(({ key, icon, label }) => ({
              key,
              icon,
              label,
            }))}
          />
        </Sider>
        <Content className="p-8 bg-white">{activeComponent}</Content>
      </Layout>
    </Layout>
  );
}
