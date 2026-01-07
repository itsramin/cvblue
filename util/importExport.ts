import { ExportData, ICVCollection } from "@/type/type";

// Helper function to convert JSON to XML
export const jsonToXml = (obj: any, rootName = "root"): string => {
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

  if (rootName === "root") {
    return xml;
  }

  return xml;
};

// Helper function to convert XML to JSON
export const xmlToJson = (xmlStr: string, isCollection = false): any => {
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

  const rootName = isCollection ? "cv-collection" : "cv-blue";
  const root = xmlDoc.querySelector(rootName);
  if (!root) {
    throw new Error(`Invalid XML format: missing ${rootName} root`);
  }

  return parseXmlNode(root);
};

// Validate imported data structure for single CV
export const isValidCVData = (data: any): data is ExportData => {
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

// Validate imported data structure for CV collection
export const isValidCVCollection = (data: any): data is ICVCollection => {
  return (
    data && typeof data === "object" && "cvs" in data && Array.isArray(data.cvs)
  );
};

// Download file utility
export const downloadFile = (
  dataStr: string,
  fileName: string,
  mimeType: string
) => {
  const dataUri = `data:${mimeType};charset=utf-8,${encodeURIComponent(
    dataStr
  )}`;
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", fileName);
  linkElement.click();
};

// Read uploaded file utility
export const readUploadedFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };

    reader.onerror = () => {
      reject(new Error("File read error"));
    };

    reader.readAsText(file);
  });
};

// Detect file format
export const detectFileFormat = (fileName: string): "json" | "xml" | null => {
  const fileNameLower = fileName.toLowerCase();
  if (fileNameLower.endsWith(".json")) return "json";
  if (fileNameLower.endsWith(".xml")) return "xml";
  return null;
};
