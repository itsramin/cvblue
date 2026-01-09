"use client";

import Education from "@/components/form/Education";
import Languages from "@/components/form/Languages";
import PersonalInfo from "@/components/form/Personal";
import Projects from "@/components/form/Projects";
import Skills from "@/components/form/Skills";
import WorkExperience from "@/components/form/WorkExperience";
import { Menu, Layout, Button } from "antd";
import { useEffect, useState } from "react";
import Backup from "@/components/form/Backup";
import Link from "next/link";
import { useData } from "@/store/store";
import { useRouter } from "next/navigation";
import { EyeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Certifications from "@/components/form/Certificates";

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
      label: "Personal Information",
    },
    {
      key: "experience",
      label: "Work Experience",
    },
    {
      key: "education",
      label: "Education",
    },
    {
      key: "skills",
      label: "Skills",
    },
    {
      key: "languages",
      label: "Languages",
    },
    {
      key: "projects",
      label: "Projects",
    },
    {
      key: "certifications",
      label: "Certifications",
    },
    {
      type: "divider" as const,
    },
    {
      key: "backup",
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
      case "certifications":
        return <Certifications />;
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
