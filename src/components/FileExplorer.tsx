import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLanguageByExtension } from "@/lib/language";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  File,
  FileText,
  Folder,
  FolderOpen,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import LanguageIcon from "./LanguageIcon";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  path: string;
  size?: number;
  modified?: string;
  language?: string;
}

const sampleFileStructure: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    path: "src",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        path: "src/components",
        children: [
          {
            id: "3",
            name: "App.tsx",
            type: "file",
            path: "src/components/App.tsx",
            language: getLanguageByExtension("tsx"),
            size: 2048,
          },
          {
            id: "4",
            name: "Header.tsx",
            type: "file",
            path: "src/components/Header.tsx",
            language: getLanguageByExtension("tsx"),
            size: 1024,
          },
          {
            id: "5",
            name: "Sidebar.tsx",
            type: "file",
            path: "src/components/Sidebar.tsx",
            language: getLanguageByExtension("tsx"),
            size: 1536,
          },
        ],
      },
      {
        id: "6",
        name: "hooks",
        type: "folder",
        path: "src/hooks",
        children: [
          {
            id: "7",
            name: "useLocalStorage.ts",
            type: "file",
            path: "src/hooks/useLocalStorage.ts",
            language: "typescript",
            size: 512,
          },
          {
            id: "8",
            name: "useDebounce.ts",
            type: "file",
            path: "src/hooks/useDebounce.ts",
            language: "typescript",
            size: 256,
          },
        ],
      },
      {
        id: "9",
        name: "index.tsx",
        type: "file",
        path: "src/index.tsx",
        language: getLanguageByExtension("tsx"),
        size: 384,
      },
      {
        id: "10",
        name: "App.css",
        type: "file",
        path: "src/App.css",
        language: "css",
        size: 1024,
      },
      {
        id: "11",
        name: "utils.ts",
        type: "file",
        path: "src/utils.ts",
        language: "typescript",
        size: 768,
      },
    ],
  },
  {
    id: "12",
    name: "public",
    type: "folder",
    path: "public",
    children: [
      {
        id: "13",
        name: "index.html",
        type: "file",
        path: "public/index.html",
        language: "html",
        size: 1024,
      },
      {
        id: "14",
        name: "favicon.ico",
        type: "file",
        path: "public/favicon.ico",
        size: 64,
      },
    ],
  },
  {
    id: "15",
    name: "package.json",
    type: "file",
    path: "package.json",
    language: "json",
    size: 2048,
  },
  {
    id: "16",
    name: "tsconfig.json",
    type: "file",
    path: "tsconfig.json",
    language: "json",
    size: 512,
  },
  {
    id: "17",
    name: "README.md",
    type: "file",
    path: "README.md",
    language: "markdown",
    size: 1024,
  },
  { id: "18", name: ".gitignore", type: "file", path: ".gitignore", size: 256 },
];

const FileExplorer = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["1"]),
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (file: FileNode) => {
    if (file.type === "folder") {
      return expandedFolders.has(file.id) ? (
        <FolderOpen className="w-4 h-4 text-accent" />
      ) : (
        <Folder className="w-4 h-4 text-accent" />
      );
    }

    // File type icons based on extension
    const ext = file.name.split(".").pop()?.toLowerCase();
    return (
      <LanguageIcon
        language={getLanguageByExtension(ext)}
        className="w-3 h-3"
      />
    );
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = selectedFile === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={cn(
            "flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-sidebar-accent transition-colors group",
            isSelected && "bg-sidebar-accent text-sidebar-accent-foreground",
            "text-sm",
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.id);
            } else {
              setSelectedFile(node.id);
            }
          }}
        >
          {node.type === "folder" && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          )}
          {node.type === "file" && <div className="w-4" />}

          {getFileIcon(node)}

          <span className="flex-1 truncate">{node.name}</span>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {node.type === "folder" && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const filteredFiles = (nodes: FileNode[]): FileNode[] => {
    if (!searchQuery) return nodes;

    return nodes.reduce((acc: FileNode[], node) => {
      if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        acc.push(node);
      } else if (node.type === "folder" && node.children) {
        const filteredChildren = filteredFiles(node.children);
        if (filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
        }
      }
      return acc;
    }, []);
  };

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm uppercase tracking-wide">
            Explorer
          </h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <FolderPlus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-7 text-xs bg-sidebar-accent border-sidebar-border"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-auto">
        <div className="py-1">
          {filteredFiles(sampleFileStructure).map((node) =>
            renderFileNode(node),
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-2 border-t border-sidebar-border text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>{sampleFileStructure.length} items</span>
          <span>Modified 2min ago</span>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
