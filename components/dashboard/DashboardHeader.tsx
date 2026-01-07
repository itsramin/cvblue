import { Input, Button, message } from "antd";
import {
  PlusOutlined,
  ExportOutlined,
  ImportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FileUploader from "@/components/importExport/FileUploader";
import { ImportService } from "@/services/importService";
import { useData } from "@/store/store";
import { Title } from "../UI/MyText";

const { Search } = Input;

interface DashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateCV: () => void;
  onExportAll: () => void;

  hasCVs: boolean;
}

export default function DashboardHeader({
  searchTerm,
  onSearchChange,
  onCreateCV,
  onExportAll,

  hasCVs,
}: DashboardHeaderProps) {
  const { addCV } = useData();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFileUpload = async (file: File) => {
    try {
      const importedData = await ImportService.importCVCollection(file);

      // Import each CV
      importedData.cvs.forEach((cvData: any) => {
        addCV({
          name: cvData.name || `Imported CV ${new Date().toLocaleDateString()}`,
          personalInfo: cvData.personalInfo,
          experiences: cvData.experiences || [],
          educations: cvData.educations || [],
          skills: cvData.skills || [],
          languages: cvData.languages || [],
          projects: cvData.projects || [],
        });
      });

      messageApi.success(
        `Successfully imported ${importedData.cvs.length} CV${
          importedData.cvs.length > 1 ? "s" : ""
        }!`
      );
    } catch (error: any) {
      messageApi.error(error.message || "Failed to import data");
      throw error;
    }
  };

  return (
    <div className="mb-8">
      {contextHolder}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <Title level={3} className="!mb-1 font-semibold">
            Dashboard CV Manager
          </Title>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Search
            placeholder="Search CVs..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-64"
            allowClear
            prefix={<SearchOutlined />}
          />

          <div className="flex gap-3">
            <FileUploader
              onUpload={handleFileUpload}
              buttonText="Import All"
              buttonProps={{
                icon: <ImportOutlined />,
                className: "whitespace-nowrap",
              }}
            />

            <Button
              icon={<ExportOutlined />}
              onClick={onExportAll}
              className="whitespace-nowrap"
              disabled={!hasCVs}
            >
              Export All
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onCreateCV}
              className="whitespace-nowrap"
            >
              New CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
