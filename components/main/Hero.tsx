import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.png";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold  text-gray-900 leading-tight">
              Create Your Perfect CV in minutes with{" "}
              <Image src={logo} alt="logo" height={120} width={400} />
            </h1>

            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Build a professional CV that stands out. Our intuitive builder
              guides you through each section, ensuring you highlight your
              skills and experience effectively. Perfect for job seekers at all
              career levels.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="text-gray-700">
                  Manage multiple CVs for different companies
                </div>
              </div>
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
              <Link href={"/dashboard"}>
                <Button type="primary" size="large">
                  Start Building Your CV
                </Button>
              </Link>
              {/* <Link href={"/preview"}>
                  <Button
                    size="large"
                    icon={<EyeOutlined />}
                    className="h-12 px-8"
                  >
                    Preview Template
                  </Button>
                </Link> */}
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
                    <span className="text-3xl font-bold text-blue-600">JD</span>
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
  );
}
