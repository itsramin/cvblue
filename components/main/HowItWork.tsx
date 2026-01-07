import { Button, Steps } from "antd";
import {
  FormOutlined,
  EyeOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Step } = Steps;

export default function HowItWork() {
  const steps = [
    {
      title: "Create a CV",
      description: "Give it a name",
      icon: <PlusOutlined />,
    },
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
          <Steps current={0} labelPlacement="vertical" className="custom-steps">
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
            <Link href={"/dashboard"}>
              <Button type="primary" size="large">
                Start Building Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
