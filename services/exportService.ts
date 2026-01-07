import { downloadFile, jsonToXml } from "@/util/importExport";

export class ExportService {
  static exportSingleCV(
    data: any,
    format: "json" | "xml",
    cvName: string,
    rootName: string = "cv-blue"
  ) {
    let dataStr: string;
    let mimeType: string;
    let fileExtension: string;

    if (format === "json") {
      dataStr = JSON.stringify(data, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    } else {
      // XML export
      const xmlContent = jsonToXml(data);
      dataStr = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${xmlContent}\n</${rootName}>`;
      mimeType = "application/xml";
      fileExtension = "xml";
    }

    const safeCvName = cvName.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    const exportDate = new Date().toISOString().split("T")[0];
    const fileName = `${safeCvName}-${exportDate}.${fileExtension}`;

    downloadFile(dataStr, fileName, mimeType);

    return { fileName, format };
  }

  static exportCVCollection(
    cvs: any[],
    format: "json" | "xml",
    selectedCVs?: string[]
  ) {
    const cvsToExport = selectedCVs
      ? cvs.filter((cv) => selectedCVs.includes(cv.id))
      : cvs;

    if (cvsToExport.length === 0) {
      throw new Error("No CVs selected for export");
    }

    const exportData = {
      cvs: cvsToExport,
      exportedAt: new Date().toISOString(),
      totalCVs: cvsToExport.length,
    };

    let dataStr: string;
    let mimeType: string;
    let fileExtension: string;

    if (format === "json") {
      dataStr = JSON.stringify(exportData, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    } else {
      // XML export
      const xmlContent = jsonToXml(exportData);
      dataStr = `<?xml version="1.0" encoding="UTF-8"?>\n<cv-collection>\n${xmlContent}\n</cv-collection>`;
      mimeType = "application/xml";
      fileExtension = "xml";
    }

    const exportDate = new Date().toISOString().split("T")[0];
    const fileName = `cv-collection-${exportDate}.${fileExtension}`;

    downloadFile(dataStr, fileName, mimeType);

    return { fileName, format, count: cvsToExport.length };
  }
}
