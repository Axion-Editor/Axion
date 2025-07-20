import { useState } from "react";
import { X, Plus, Circle, Text } from "lucide-react";
import { SiTypescript, SiJavascript, SiPython, SiHtml5, SiJson, SiMarkdown, SiCss3, SiReact } from 'react-icons/si';

import AceEditor from 'react-ace';

// Import modes (languages)
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/mode-tsx';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-text';

// Import themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-dracula';

// Import extensions
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

interface Tab {
  id: string;
  name: string;
  path: string;
  language?: string;
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
      language: "typescript",
      content: `import React from 'react';

const Index = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to Axion</h1>
    </div>
  );
};

export default Index;`,
      isModified: false
    },
    {
      id: "2",
      name: "style.css",
      path: "style.css",
      language: "css",
      content: `/* Add your CSS styles here */
body {
  background-color: #f0f0f0;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}`,
      isModified: true
    },
    {
      id: "3",
      name: "README.md",
      path: "README.md",
      language: "markdown",
      content: `# Axion

This is a simple code editor built with React and Ace Editor for syntax highlighting.

## Features

- Multiple tabs
- Syntax highlighting
- File type detection
- Modern dark theme`,
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
      language: "text",
      content: "// New file\n",
      isModified: false
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const updateTabContent = (tabId: string, content: string) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === tabId 
          ? { ...tab, content, isModified: true }
          : tab
      )
    );
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      {/* Tab Bar */}
      <div className="flex items-center bg-gray-800 border-b border-gray-700">
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-2 border-r border-gray-700 cursor-pointer group hover:bg-gray-700 transition-colors min-w-0 flex-shrink-0 ${
                activeTab === tab.id ? "bg-gray-900 text-white" : "bg-gray-800 text-gray-400"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <LanguageIcon language={tab.language} />
              <span className="text-sm truncate max-w-[120px]">{tab.name}</span>
              {tab.isModified && (
                <Circle className="w-2 h-2 fill-orange-500 text-orange-500 flex-shrink-0" />
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
          className="p-2 hover:bg-gray-700 transition-colors border-l border-gray-700 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {tabs.length > 0 && currentTab ? (
          <AceEditorComponent
            value={currentTab.content}
            language={currentTab.language || "text"}
            onChange={(content) => updateTabContent(currentTab.id, content)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">No files open</p>
              <p className="text-sm">Open a file from the sidebar or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LanguageIcon = ({ language }: { language?: string }) => {
  const getIcon = () => {
    switch (language) {
      case "typescript":
        return <SiTypescript className="w-3 h-3 text-blue-500" />;
      case "python":
        return <SiPython className="w-3 h-3 text-yellow-500" />;
      case "html":
        return <SiHtml5 className="w-3 h-3 text-orange-500" />;
      case "json":
        return <SiJson className="w-3 h-3 text-yellow-600" />;
      case "markdown":
        return <SiMarkdown className="w-3 h-3 text-gray-400" />;
      case "javascript":
        return <SiJavascript className="w-3 h-3 text-yellow-500" />;
      case "css":
      case "scss":
        return <SiCss3 className="w-3 h-3 text-blue-500" />;
      case "tsx":
        return <SiReact className="w-3 h-3 text-blue-400" />;
      default:
        return <Text className="w-3 h-3 text-gray-400" />;
    }
  };

  return getIcon();
};

// Map file extensions to Ace Editor modes
const getAceMode = (language?: string): string => {
  switch (language) {
    case 'typescript': return 'typescript';
    case 'javascript': return 'javascript';
    case 'tsx': return 'tsx';
    case 'jsx': return 'jsx';
    case 'css': return 'css';
    case 'scss': return 'css';
    case 'html': return 'html';
    case 'markdown': return 'markdown';
    case 'python': return 'python';
    case 'json': return 'json';
    default: return 'text';
  }
};

const AceEditorComponent = ({ value, language, onChange }: {
  value: string;
  language: string;
  onChange: (value: string) => void;
}) => {
  return (
    <AceEditor
      mode={getAceMode(language)}
      theme="tomorrow_night"
      value={value}
      onChange={onChange}
      name={`ace-editor-${language}`}
      editorProps={{ $blockScrolling: true }}
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      width="100%"
      height="100%"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        useWorker: false,
        wrap: false,
        fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
      }}
      commands={[
        {
          name: 'save',
          bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
          exec: () => {
            // Handle save functionality
            console.log('Save triggered');
          }
        }
      ]}
    />
  );
};

export default CodeEditor;