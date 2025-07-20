import { Text } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiJson,
  SiMarkdown,
  SiCss3,
  SiReact,
  SiKotlin,
  SiC,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

interface LanguageIconProps {
  language: string;
  className?: string;
}

const LanguageIcon = ({ language, className }: LanguageIconProps) => {
  if (language.toLowerCase().includes("react"))
    return <SiReact className={className} />;

  switch (language.toLowerCase()) {
    case "typescript":
      return <SiTypescript className={className} />;
    case "javascript":
      return <SiJavascript className={className} />;
    case "python":
      return <SiPython className={className} />;
    case "c++":
      return <SiCplusplus className={className} />;
    case "c":
      return <SiC className={className} />;
    case "html":
      return <SiHtml5 className={className} />;
    case "json":
      return <SiJson className={className} />;
    case "markdown":
      return <SiMarkdown className={className} />;
    case "css":
    case "scss":
      return <SiCss3 className={className} />;
    case "react":
      return <SiReact className={className} />;
    case "kotlin":
      return <SiKotlin className={className} />;
    case "java":
      return <FaJava className={className} />;
    case "text":
    default:
      return <Text className={className} />;
  }
};

export default LanguageIcon;
