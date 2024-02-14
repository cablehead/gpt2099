import type { Component } from "solid-js";

import { ThemeProvider } from "solid-theme-provider";

import { themes, styles } from "./themes";

const App: Component = () => {
  return (
    <div>
      <ThemeProvider themes={themes} styles={styles} />

      <div style="background-color: var(--stp-background-reverse)">oh hai</div>
    </div>
  );
};

export default App;
