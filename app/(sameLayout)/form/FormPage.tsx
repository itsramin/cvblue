"use client";

import Education from "@/components/formSections/Education";
import Languages from "@/components/formSections/Languages";
import PersonalInfo from "@/components/formSections/Personal";
import Projects from "@/components/formSections/Projects";
import Skills from "@/components/formSections/Skills";
import WorkExperience from "@/components/formSections/WorkExperience";
import { Menu, Layout, Button } from "antd";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  BuildOutlined,
  BookOutlined,
  CodeOutlined,
  GlobalOutlined,
  ProjectOutlined,
  DatabaseOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Backup from "@/components/formSections/Backup";
import Link from "next/link";
import { useData } from "@/store/store";
import { useRouter } from "next/navigation";

const { Sider, Content } = Layout;

export default function FormPage() {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const { activeCVId, activeCV } = useData();
  const nav = useRouter();

  useEffect(() => {
    if (!activeCVId) {
      return nav.push("/dashboard");
    }
  }, [activeCVId]);

  // Define menu items for sections
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
    <>
      <Sider
        width={300}
        className="!bg-white border-r border-gray-200"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="p-6">
          <div className="flex flex-col gap-3">
            <div className="text-center font-bold text-2xl">
              {activeCV?.name}
            </div>
            <Link href={"/dashboard"}>
              <Button block icon={<ArrowLeftOutlined />}>
                Back to Dashbord
              </Button>
            </Link>
            <Link href={"/preview"}>
              <Button block type="primary" icon={<EyeOutlined />}>
                Preview
              </Button>
            </Link>
          </div>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeSection]}
          onClick={handleMenuClick}
          className="border-0"
          items={menuItems}
        />
      </Sider>
      <Content className="p-4 md:p-8 bg-white">{getActiveComponent()}</Content>
    </>
  );
}
