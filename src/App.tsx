import type { Component } from "solid-js";

import { ThemeProvider } from "solid-theme-provider";

import { styles, themes } from "./themes";

import s from "./Card.module.css";

const App: Component = () => {
  return (
    <div>
      <ThemeProvider themes={themes} styles={styles} />

      <div class={s.card}>oh hai</div>
    </div>
  );
};

export default App;
