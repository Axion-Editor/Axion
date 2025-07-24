import { useState, useCallback, useEffect, useRef } from "react";
import { X, Plus, Circle } from "lucide-react";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { json } from "@codemirror/lang-json";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";

import { cn, isNative } from "@/lib/utils";
import LanguageIcon from "./LanguageIcon";
import { Language } from "@/lib/language";

interface Tab {
  id: string;
  name: string;
  path: string;
  language?: Language;
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
      language: "TypeScript React",
      content: `import React from 'react';

const Index = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to Axion</h1>
    </div>
  );
};

export default Index;`,
      isModified: false,
    },
    {
      id: "2",
      name: "style.css",
      path: "style.css",
      language: "CSS",
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
      isModified: false,
    },
    {
      id: "3",
      name: "README.md",
      path: "README.md",
      language: "Markdown",
      content: `# Axion

This is a simple code editor built with React and CodeMirror for syntax highlighting.

## Features

- Multiple tabs
- Syntax highlighting
- File type detection
- Modern dark theme`,
      isModified: false,
    },
  ]);

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      name: "untitled.txt",
      path: "untitled.txt",
      language: "Text",
      content: "// New file\n",
      isModified: false,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const updateTabContent = (tabId: string, content: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, content, isModified: true } : tab,
      ),
    );
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="flex h-full flex-col-reverse bg-editor">
      {/* Tab Bar */}
      <div className="flex items-center bg-card border-b border-border">
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "flex items-center gap-2 px-2 md:px-3 py-2 border-r border-border cursor-pointer group hover:bg-muted transition-colors min-w-0 flex-shrink-0",
                activeTab === tab.id
                  ? "bg-editor text-foreground"
                  : "bg-card text-muted-foreground",
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <LanguageIcon language={tab.language} className="w-3 h-3" />
              <span className="text-sm truncate max-w-[80px] sm:max-w-[120px]">
                {tab.name}
              </span>
              {tab.isModified && (
                <Circle className="w-2 h-2 fill-accent text-accent flex-shrink-0" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className={cn(
                  "p-0.5 rounded opacity-70 group-hover:opacity-100 hover:bg-muted-foreground/20 transition-opacity flex-shrink-0",
                  isNative() ? "md:opacity-50" : "md:opacity-0",
                )}
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
      <div className="flex-1 overflow-hidden">
        {tabs.length > 0 && currentTab ? (
          <CodeMirrorEditor
            value={currentTab.content}
            language={currentTab.language || "Text"}
            onChange={(content) => updateTabContent(currentTab.id, content)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground p-4">
            <div className="text-center">
              <p className="text-base sm:text-lg mb-2">No files open</p>
              <p className="text-xs sm:text-sm">
                Open a file from the sidebar or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Get CodeMirror language extension based on Language type
const getLanguageExtension = (language: Language) => {
  switch (language) {
    case "TypeScript":
    case "JavaScript":
      return [javascript({ typescript: language === "TypeScript" })];
    case "TypeScript React":
    case "JavaScript React":
      return [
        javascript({
          typescript: language === "TypeScript React",
          jsx: true,
        }),
      ];
    case "CSS":
      return [css()];
    case "HTML":
      return [html()];
    case "Markdown":
      return [markdown()];
    case "Python":
      return [python()];
    case "JSON":
      return [json()];
    case "Text":
    default:
      return [];
  }
};

const CodeMirrorEditor = ({
  value,
  language,
  onChange,
}: {
  value: string;
  language: Language;
  onChange: (value: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const [editorHeight, setEditorHeight] = useState("400px");

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange],
  );

  // Dynamically calculate height based on container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => {
      const rect = container.getBoundingClientRect();
      setEditorHeight(`${rect.height}px`);
    };

    // Initial height calculation
    updateHeight();

    // Create ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Handle viewport changes (keyboard show/hide)
  useEffect(() => {
    let initialViewportHeight = window.visualViewport?.height || window.innerHeight;
    
    const handleViewportChange = () => {
      if (!window.visualViewport || !editorViewRef.current) return;
      
      const currentHeight = window.visualViewport.height;
      const heightDifference = initialViewportHeight - currentHeight;
      
      // If viewport height decreased significantly (keyboard likely showed)
      if (heightDifference > 100) {
        // Small delay to ensure keyboard is fully shown
        setTimeout(() => {
          const view = editorViewRef.current;
          if (view) {
            // Get current cursor position
            const selection = view.state.selection.main;
            const cursorPos = selection.head;
            
            // Scroll cursor into view with some padding from bottom
            view.dispatch({
              effects: EditorView.scrollIntoView(cursorPos, {
                y: "start",
                yMargin: 100 // Add some margin from the top
              })
            });
          }
        }, 150);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange);
      };
    }
  }, []);

  const diagonalScrollExtension = EditorView.domEventHandlers({
    wheel(event, view) {
      const { deltaX, deltaY } = event;

      if (deltaX !== 0 && deltaY !== 0) {
        event.preventDefault();

        const scroller = view.scrollDOM;
        scroller.scrollLeft += deltaX;
        scroller.scrollTop += deltaY;

        return true;
      }

      return false;
    },
  });

  // Extension to handle focus and cursor visibility
  const cursorVisibilityExtension = EditorView.updateListener.of((update) => {
    if (update.selectionSet && update.view.hasFocus) {
      // Store reference to editor view
      editorViewRef.current = update.view;
      
      // Small delay to ensure cursor position is updated
      setTimeout(() => {
        const selection = update.view.state.selection.main;
        const cursorPos = selection.head;
        
        // Check if cursor is near bottom of visible area
        const cursorCoords = update.view.coordsAtPos(cursorPos);
        if (cursorCoords) {
          const editorRect = update.view.dom.getBoundingClientRect();
          const viewportHeight = window.visualViewport?.height || window.innerHeight;
          
          // If cursor is in bottom 30% of viewport, scroll it into better view
          if (cursorCoords.bottom > viewportHeight * 0.7) {
            update.view.dispatch({
              effects: EditorView.scrollIntoView(cursorPos, {
                y: "start",
                yMargin: 100
              })
            });
          }
        }
      }, 50);
    }
  });

  const extensions = [
    ...getLanguageExtension(language),
    EditorView.theme({
      "&": {
        fontSize: "14px",
        fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
      },
      ".cm-content": {
        padding: "0px",
        minHeight: "100%",
      },
      ".cm-focused": {
        outline: "none",
      },
      ".cm-editor": {
        height: "100%",
      },
      ".cm-scroller": {
        fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
        overflow: "auto",
      },
    }),
    diagonalScrollExtension,
    cursorVisibilityExtension,
  ];

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <CodeMirror
        value={value}
        height={editorHeight}
        width="100%"
        theme={tokyoNight}
        extensions={extensions}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: false,
          searchKeymap: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;