import { useEffect, useState } from "react";
import { X, Plus, Circle, Text } from "lucide-react";
import { cn } from "@/lib/utils";
import { BundledLanguage, codeToHtml } from "shiki";
import { SiTypescript, SiJavascript, SiPython, SiHtml5, SiJson, SiMarkdown, SiCss3, SiReact } from 'react-icons/si';

interface Tab {
  id: string;
  name: string;
  path: string;
  language?: BundledLanguage;
  content: string;
  isModified: boolean;
}

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "1",
      name: "index.tsx",
      path: "index.tsx",
      language: "tsx",
      content: `
import React from 'react';

const Index = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to Axion</h1>
    </div>
  );
};

export default Index;
      `.trim(),
      isModified: false
    },
    {
      id: "2",
      name: "style.css",
      path: "style.css",
      language: "css",
      content: `
/* Add your CSS styles here */
body {
  background-color: #f0f0f0;
  color: #333;
}
        `.trim(),
      isModified: true
    },
    {
      id: "3",
      name: "README.md",
      path: "README.md",
      language: "markdown",
      content: `
# Axion
This is a simple code editor built with React and Shiki for syntax highlighting.
      `.trim(),
      isModified: false
    }
  ]);

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      name: "untitled.txt",
      path: "untitled.txt",
      language: null,
      content: "Not editable (Read only)",
      isModified: false
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  return (
    <div className="flex h-full flex-col bg-editor">
      {/* Tab Bar */}
      <div className="flex items-center bg-card border-b border-border">
        <div className="flex flex-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "flex items-center gap-2 px-2 md:px-3 py-2 border-r border-border cursor-pointer group hover:bg-muted transition-colors min-w-0 flex-shrink-0",
                activeTab === tab.id ? "bg-editor text-foreground" : "bg-card text-muted-foreground"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <LanguageIcon language={tab.language} />
              <span className="text-sm truncate max-w-[80px] sm:max-w-[120px]">{tab.name}</span>
              {tab.isModified && (
                <Circle className="w-2 h-2 fill-accent text-accent flex-shrink-0" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="p-0.5 rounded opacity-70 md:opacity-0 group-hover:opacity-100 hover:bg-muted-foreground/20 transition-opacity flex-shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addNewTab}
          className="p-2 hover:bg-muted transition-colors border-l border-border flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 select-text overflow-hidden">
        {tabs.length > 0 ? (
          <div className="overflow-auto font-mono text-xs sm:text-sm">
            <CodeBlock
              code={tabs.find(tab => tab.id === activeTab)?.content || ""}
              lang={tabs.find(tab => tab.id === activeTab)?.language}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground p-4">
            <div className="text-center">
              <p className="text-base sm:text-lg mb-2">No files open</p>
              <p className="text-xs sm:text-sm">Open a file from the sidebar or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LanguageIcon = ({ language }: { language: string }) => {
  const getIcon = () => {
    switch (language) {
      case "typescript":
        return <SiTypescript className="w-3 h-3" />;
      case "python":
        return <SiPython className="w-3 h-3" />;
      case "html":
        return <SiHtml5 className="w-3 h-3" />;
      case "json":
        return <SiJson className="w-3 h-3" />;
      case "markdown":
        return <SiMarkdown className="w-3 h-3" />;
      case "javascript":
        return <SiJavascript className="w-3 h-3" />;
      case "css":
      case "scss":
        return <SiCss3 className="w-3 h-3" />;
      case "tsx":
        return <SiReact className="w-3 h-3" />;
      default:
        return <Text className="w-3 h-3" />;
    }
  };

  return getIcon();
};

const CodeBlock = ({ code, lang }: { code: string; lang?: BundledLanguage }) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    (async () => {
      const html = await codeToHtml(code, {
        lang,
        theme: "catppuccin-frappe"
      });
      setHtml(html);
    })();
  }, [code, lang]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default CodeEditor;
