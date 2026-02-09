import React from "react";

/**
 * Runs before React hydration to avoid a flash of the wrong theme.
 * Strategy:
 * - localStorage.theme = "light" | "dark" wins
 * - otherwise follow system preference
 * - apply by toggling `document.documentElement.classList.toggle("dark")`
 */
export default function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=t?t:(d?'dark':'light');var root=document.documentElement;if(theme==='dark'){root.classList.add('dark');}else{root.classList.remove('dark');}}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

