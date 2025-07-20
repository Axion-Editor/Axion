export type Language =
  | "Java"
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Kotlin"
  | "HTML"
  | "CSS"
  | "Markdown"
  | "JSON"
  | "XML"
  | "TypeScript React"
  | "JavaScript React"
  | "C++"
  | "C"
  | "Text"
  | "Unknown";

export const getLanguageByExtension = (extension: string): Language => {
  switch (extension) {
    case "java":
      return "Java";
    case "js":
      return "JavaScript";
    case "ts":
      return "TypeScript";
    case "py":
      return "Python";
    case "kt":
      return "Kotlin";
    case "html":
      return "HTML";
    case "css":
    case "scss":
      return "CSS";
    case "md":
      return "Markdown";
    case "json":
      return "JSON";
    case "xml":
      return "XML";
    case "tsx":
      return "TypeScript React";
    case "jsx":
      return "JavaScript React";
    case "cpp":
      return "C++";
    case "c":
      return "C";
    case "txt":
      return "Text";
    default:
      return "Unknown";
  }
};
