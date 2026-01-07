import {
  detectFileFormat,
  readUploadedFile,
  xmlToJson,
  isValidCVData,
  isValidCVCollection,
} from "@/util/importExport";

export class ImportService {
  static async importSingleCV(file: File): Promise<any> {
    const format = detectFileFormat(file.name);

    if (!format) {
      throw new Error(
        "Unsupported file format. Please upload JSON or XML files."
      );
    }

    const fileContent = await readUploadedFile(file);
    let importedData: any;

    if (format === "xml") {
      importedData = xmlToJson(fileContent, false);
    } else {
      importedData = JSON.parse(fileContent);
    }

    if (!isValidCVData(importedData)) {
      throw new Error("Invalid CV data structure");
    }

    return importedData;
  }

  static async importCVCollection(file: File): Promise<any> {
    const format = detectFileFormat(file.name);

    if (!format) {
      throw new Error(
        "Unsupported file format. Please upload JSON or XML files."
      );
    }

    const fileContent = await readUploadedFile(file);
    let importedData: any;

    if (format === "xml") {
      importedData = xmlToJson(fileContent, true);
    } else {
      importedData = JSON.parse(fileContent);
    }

    if (!isValidCVCollection(importedData)) {
      throw new Error("Invalid CV collection structure");
    }

    return importedData;
  }
}
