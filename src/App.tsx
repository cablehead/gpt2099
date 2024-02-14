import type { Component } from "solid-js";

import { ThemeProvider } from "solid-theme-provider";

import { styles, themes } from "./themes";

import s from "./Card.module.scss";

const App: Component = () => {
  return (
    <div style="display: flex; flex-direction: column; gap: 1em;">
      <div style="display: flex; gap: 1em; justify-content: flex-end;">
        <ThemeProvider themes={themes} styles={styles} />
      </div>

      <div style="display: flex; gap: 1em;">
        <div class={s.card}>oh hai</div>
        <div
          classList={{
            [s.card]: true,
            [s.selected]: true,
          }}
        >
          oh hai
        </div>
      </div>
    </div>
  );
};

export default App;
