import { useState } from "react";
import { Modal, Button, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import FormatSelector from "@/components/importExport/FormatSelector";
import { ExportService } from "@/services/exportService";
import { ICV } from "@/type/type";
import { Text } from "../UI/MyText";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
  cvs: ICV[];
  selectedExportCVs: string[];
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onToggleCVSelection: (cvId: string) => void;
}

export default function ExportModal({
  open,
  onClose,
  cvs,
  selectedExportCVs,
  onSelectAll,
  onDeselectAll,
  onToggleCVSelection,
}: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState<"json" | "xml">("json");
  const [messageApi, contextHolder] = message.useMessage();

  const handleExportAllCVs = () => {
    try {
      if (cvs.length === 0) {
        messageApi.warning("No CVs to export. Please create a CV first.");
        return;
      }

      const result = ExportService.exportCVCollection(
        cvs,
        exportFormat,
        selectedExportCVs.length > 0 ? selectedExportCVs : undefined
      );

      messageApi.success(
        `Successfully exported ${result.count} CV${
          result.count > 1 ? "s" : ""
        } as ${result.format.toUpperCase()}!`
      );

      onClose();
    } catch (error: any) {
      messageApi.error(error.message || "Failed to export CVs");
      console.error("Export error:", error);
    }
  };

  return (
    <Modal
      title="Export CV Collection"
      open={open}
      onOk={handleExportAllCVs}
      onCancel={onClose}
      okText="Export"
      cancelText="Cancel"
      width={600}
    >
      <div className="my-10">
        <div className="mb-10 flex justify-between items-center">
          <Text strong className="block mb-2">
            Export Format
          </Text>
          <FormatSelector
            value={exportFormat}
            onChange={setExportFormat}
            buttonStyle="solid"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col gap-2">
              <Text strong>Select CVs</Text>
              <Text className="!text-gray-500">{`${
                selectedExportCVs.length
              } CV${
                selectedExportCVs.length > 1 ? "s" : ""
              } selected for export.`}</Text>
            </div>
            <div className="flex gap-2">
              <Button size="small" onClick={onSelectAll}>
                Select All
              </Button>
              <Button size="small" onClick={onDeselectAll}>
                Deselect All
              </Button>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto border border-gray-400 rounded px-2">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className={`flex items-center justify-between p-2 my-2 hover:bg-gray-50 rounded cursor-pointer ${
                  selectedExportCVs.includes(cv.id) ? "bg-blue-50" : ""
                }`}
                onClick={() => onToggleCVSelection(cv.id)}
              >
                <div>
                  <Text strong>{cv.name}</Text>
                  <div className="text-xs text-gray-500">
                    {cv.experiences.length} exp, {cv.educations.length} edu,{" "}
                    {cv.skills.length} skills
                  </div>
                </div>
                <div>
                  {selectedExportCVs.includes(cv.id) ? (
                    <CheckOutlined className="text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border rounded" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
}
