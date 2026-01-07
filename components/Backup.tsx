import React from "react";
import {
  Button,
  message,
  Upload,
  Radio,
  RadioChangeEvent,
  Alert,
  Tag,
  Card,
  Statistic,
  Row,
  Col,
} from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useData } from "@/store/store";
import { ExportData } from "@/type/type";

export default function Backup() {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    activeCV,
    personalInfo,
    experiences,
    educations,
    skills,
    languages,
    projects,

    importData,
  } = useData();

  const [exportFormat, setExportFormat] = React.useState<"json" | "xml">(
    "json"
  );

  // Handle export format change
  const handleExportFormatChange = (e: RadioChangeEvent) => {
    setExportFormat(e.target.value);
  };

  // Export active CV data based on selected format
  const handleExport = () => {
    try {
      // Check if there's an active CV
      if (!activeCV) {
        messageApi.warning(
          "No active CV found. Please create or select a CV first."
        );
        return;
      }

      const exportData: ExportData = {
        personalInfo,
        experiences,
        educations,
        skills,
        languages,
        projects,
      };

      let dataStr: string;
      let mimeType: string;
      let fileExtension: string;

      if (exportFormat === "json") {
        dataStr = JSON.stringify(exportData, null, 2);
        mimeType = "application/json";
        fileExtension = "json";
      } else {
        // XML export
        dataStr = jsonToXml(exportData);
        mimeType = "application/xml";
        fileExtension = "xml";
      }

      const cvName = activeCV.name || "cv-blue";
      const safeCvName = cvName.replace(/[^a-z0-9]/gi, "-").toLowerCase();
      const dataUri = `data:${mimeType};charset=utf-8,${encodeURIComponent(
        dataStr
      )}`;
      const exportFileDefaultName = `${safeCvName}-${
        new Date().toISOString().split("T")[0]
      }.${fileExtension}`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      messageApi.success(
        `"${
          activeCV.name
        }" exported successfully as ${exportFormat.toUpperCase()}!`
      );
    } catch (error) {
      messageApi.error("Failed to export data");
      console.error("Export error:", error);
    }
  };

  // Helper function to convert JSON to XML
  const jsonToXml = (obj: any, nodeName = "root"): string => {
    let xml = "";

    if (Array.isArray(obj)) {
      xml = obj.map((item) => jsonToXml(item, "item")).join("");
    } else if (typeof obj === "object" && obj !== null) {
      xml = Object.keys(obj)
        .map((key) => {
          const value = obj[key];
          const childXml = jsonToXml(value, key);
          return `<${key}>${childXml}</${key}>`;
        })
        .join("");
    } else {
      // Escape special characters for XML
      const escapedValue = String(obj)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
      xml = escapedValue;
    }

    if (nodeName === "root") {
      return `<?xml version="1.0" encoding="UTF-8"?>\n<cv-blue>\n${xml}\n</cv-blue>`;
    }

    return xml;
  };

  // Handle file upload for import (auto-detect format)
  const handleFileUpload = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      const fileName = file.name.toLowerCase();

      // Check if there's an active CV
      if (!activeCV) {
        messageApi.error(
          "No active CV found. Please create or select a CV first."
        );
        reject(new Error("No active CV"));
        return;
      }

      // Detect file format by extension
      const isXML = fileName.endsWith(".xml");
      const isJSON = fileName.endsWith(".json");

      if (!isXML && !isJSON) {
        messageApi.error(
          "Unsupported file format. Please upload JSON or XML files."
        );
        reject(new Error("Unsupported file format"));
        return;
      }

      reader.onload = (e) => {
        try {
          let importedData: ExportData;
          const fileContent = e.target?.result as string;

          if (isXML) {
            // Parse XML
            importedData = xmlToJson(fileContent);
            messageApi.success("XML file detected successfully!");
          } else {
            // Parse JSON
            importedData = JSON.parse(fileContent);
            messageApi.success("JSON file detected successfully!");
          }

          // Validate import data structure
          if (!isValidImportData(importedData)) {
            throw new Error("Invalid data structure");
          }

          // Update active CV with imported data
          importData(importedData);

          resolve();
        } catch (error) {
          messageApi.error(
            "Failed to import data. Please check the file format."
          );
          reject(error);
        }
      };

      reader.onerror = () => {
        messageApi.error("Failed to read file");
        reject(new Error("File read error"));
      };

      reader.readAsText(file);
    });
  };

  // Helper function to convert XML to JSON
  const xmlToJson = (xmlStr: string): ExportData => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");

    const parseXmlNode = (node: Element): any => {
      // If node has child elements
      if (node.children.length > 0) {
        const obj: any = {};

        // Check if it's an array (multiple items with same name)
        const childNames = Array.from(node.children).map(
          (child) => child.tagName
        );
        const hasDuplicates = childNames.some(
          (name, index) => childNames.indexOf(name) !== index
        );

        if (hasDuplicates) {
          // It's an array
          const array: any[] = [];
          const processedNames = new Set();

          Array.from(node.children).forEach((child) => {
            if (!processedNames.has(child.tagName)) {
              const sameNameChildren = Array.from(node.children).filter(
                (c) => c.tagName === child.tagName
              );
              if (sameNameChildren.length > 1) {
                array.push(...sameNameChildren.map((c) => parseXmlNode(c)));
              } else {
                obj[child.tagName] = parseXmlNode(child);
              }
              processedNames.add(child.tagName);
            }
          });

          if (array.length > 0) {
            if (Object.keys(obj).length > 0) {
              return { ...obj, items: array };
            }
            return array;
          }
        } else {
          // It's an object
          Array.from(node.children).forEach((child) => {
            obj[child.tagName] = parseXmlNode(child);
          });
        }

        return obj;
      } else {
        // Text node
        return node.textContent || "";
      }
    };

    const root = xmlDoc.querySelector("cv-blue");
    if (!root) {
      throw new Error("Invalid XML format: missing cv-blue root");
    }

    return parseXmlNode(root) as ExportData;
  };

  // Validate imported data structure
  const isValidImportData = (data: any): data is ExportData => {
    return (
      data &&
      typeof data === "object" &&
      "personalInfo" in data &&
      "experiences" in data &&
      "educations" in data &&
      "skills" in data &&
      "languages" in data &&
      "projects" in data
    );
  };

  // Custom Upload props for auto-detecting format
  const uploadProps = {
    beforeUpload: (file: File) => {
      handleFileUpload(file);
      return false; // Prevent auto upload
    },
    showUploadList: false,
    accept: ".json,.xml",
    multiple: false,
  };

  const statItems = [
    {
      key: "cvName",
      title: "CV Name",
      value: activeCV?.name || "No active CV",
      suffix: null,
    },
    {
      key: "personalInfo",
      title: "Personal Info",
      value: personalInfo.name || "Not set",
      suffix: null,
    },
    {
      key: "experiences",
      title: "Experiences",
      value: experiences.length,
      suffix: "entries",
    },
    {
      key: "educations",
      title: "Educations",
      value: educations.length,
      suffix: "entries",
    },
    {
      key: "skills",
      title: "Skills",
      value: skills.length,
      suffix: "items",
    },
    {
      key: "languages",
      title: "Languages",
      value: languages.length,
      suffix: "entries",
    },
    {
      key: "projects",
      title: "Projects",
      value: projects.length,
      suffix: "entries",
    },
  ];

  return (
    <div>
      {contextHolder}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Backup & Restore
        </h1>
        <p className="text-gray-600 text-lg">
          Export your active CV data to backup or import from a previous backup.
        </p>
      </div>

      {/* Data Summary */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Current Data Summary
          </h3>
          {!activeCV && (
            <Alert
              message="No active CV selected. Please create or select a CV first."
              type="warning"
              showIcon
            />
          )}
        </div>
        <Row gutter={[16, 16]}>
          {statItems.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.key}>
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm h-full">
                <Statistic
                  title={item.title}
                  value={item.value}
                  suffix={item.suffix}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Export & Import Section */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-stretch">
          {/* Export Card */}
          <Card title="Export Format" className="flex-1">
            <div className="flex flex-col gap-6 items-center">
              <p className="text-gray-600">
                Choose your preferred export format:
              </p>

              <Radio.Group
                value={exportFormat}
                onChange={handleExportFormatChange}
                buttonStyle="solid"
              >
                <Radio.Button
                  value="json"
                  className="min-w-[100px] text-center py-3"
                >
                  JSON
                </Radio.Button>
                <Radio.Button
                  value="xml"
                  className="min-w-[100px] text-center py-3"
                >
                  XML
                </Radio.Button>
              </Radio.Group>

              <div className="mt-4">
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size="large"
                  className="w-full md:w-auto min-w-[200px]"
                  onClick={handleExport}
                  disabled={!activeCV}
                >
                  {activeCV
                    ? `Export "${activeCV.name.substring(0, 20)}${
                        activeCV.name.length > 20 ? "..." : ""
                      }" as ${exportFormat.toUpperCase()}`
                    : "No active CV to export"}
                </Button>
                <p className="text-gray-500 text-sm mt-3">
                  File will be downloaded as .{exportFormat}
                </p>
              </div>
            </div>
          </Card>

          {/* Import Card */}
          <Card title="Import Format" className="flex-1">
            <div className="flex flex-col gap-6 items-center">
              <p className="text-gray-600">
                Upload a previously exported <Tag>JSON</Tag> or <Tag>XML</Tag>
                file. The app will automatically detect the format.
              </p>

              <Alert
                message="Importing data will replace your current active CV data. Make sure to export a backup before importing."
                type="warning"
                showIcon
                className="mb-2"
              />

              {!activeCV && (
                <Alert
                  message="No active CV selected. Data will be imported into a new CV."
                  type="info"
                  showIcon
                  className="mb-2"
                />
              )}

              <div className="mt-2">
                <Upload {...uploadProps}>
                  <Button
                    icon={<UploadOutlined />}
                    size="large"
                    className="w-full md:w-auto"
                    disabled={!activeCV}
                  >
                    {activeCV
                      ? `Import to "${activeCV.name.substring(0, 20)}${
                          activeCV.name.length > 20 ? "..." : ""
                        }"`
                      : "Create or select a CV first"}
                  </Button>
                </Upload>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
