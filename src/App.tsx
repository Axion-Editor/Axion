import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { isNative } from "./lib/utils";

import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useEffect } from "react";

function hslToHex(hsl) {
  // Remove "hsl(" and ")" and split by space or comma
  const parts = hsl
    .replace(/[^\d.%]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(v => parseFloat(v));

  let [h, s, l] = parts;

  s /= 100;
  l /= 100;

  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1))));

  const r = f(0);
  const g = f(8);
  const b = f(4);

  return `#${[r, g, b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('')}`;
}

function getLuminance(r, g, b) {
  // Convert RGB to relative luminance
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function hexToRGB(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function getBestTextColor(hex) {
  const { r, g, b } = hexToRGB(hex);
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5 ? 'dark' : 'light';
}


const queryClient = new QueryClient();

const App = () => {
  const Router = isNative() ? MemoryRouter : BrowserRouter;

  useEffect(() => {
    const setBackgroundColor = async () => {
      const root = document.documentElement;
      const color = getComputedStyle(root).getPropertyValue('--color-background').trim();
      const hexColor = hslToHex(color)
      await EdgeToEdge.setBackgroundColor({ color: hexColor });
      const textColor = getBestTextColor(hexColor); 
      await StatusBar.setStyle({
        style: textColor === 'dark' ? Style.Dark : Style.Light
      });
    };

    setBackgroundColor()
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster/>
        <Sonner/>
        <Router>
          <Routes>
            <Route path={"/"} element={<Index/>}/>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path={"*"} element={<NotFound/>}/>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
