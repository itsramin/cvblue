import React from "react";
import { Button, message, Alert, Tag, Card, Statistic, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useData } from "@/store/store";
import { ExportService } from "@/services/exportService";
import { ImportService } from "@/services/importService";
import FormatSelector from "@/components/importExport/FormatSelector";
import FileUploader from "@/components/importExport/FileUploader";

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

      const exportData = {
        personalInfo,
        experiences,
        educations,
        skills,
        languages,
        projects,
      };

      const result = ExportService.exportSingleCV(
        exportData,
        exportFormat,
        activeCV.name
      );

      messageApi.success(
        `"${
          activeCV.name
        }" exported successfully as ${result.format.toUpperCase()}!`
      );
    } catch (error) {
      messageApi.error("Failed to export data");
      console.error("Export error:", error);
    }
  };

  // Handle file upload for import
  const handleFileUpload = async (file: File) => {
    try {
      // Check if there's an active CV
      if (!activeCV) {
        messageApi.error(
          "No active CV found. Please create or select a CV first."
        );
        throw new Error("No active CV");
      }

      const importedData = await ImportService.importSingleCV(file);

      // Update active CV with imported data
      importData(importedData);

      messageApi.success("Data imported successfully!");
    } catch (error: any) {
      messageApi.error(error.message || "Failed to import data");
      throw error;
    }
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

              <FormatSelector value={exportFormat} onChange={setExportFormat} />

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
                <FileUploader
                  onUpload={handleFileUpload}
                  disabled={!activeCV}
                  buttonText={
                    activeCV
                      ? `Import to "${activeCV.name.substring(0, 20)}${
                          activeCV.name.length > 20 ? "..." : ""
                        }"`
                      : "Create or select a CV first"
                  }
                  buttonProps={{
                    size: "large",
                    className: "w-full md:w-auto",
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
