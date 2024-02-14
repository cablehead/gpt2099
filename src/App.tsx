import { Component, For } from "solid-js";
import { createStore } from "solid-js/store";

import { ThemeProvider } from "solid-theme-provider";

import { styles, themes } from "./themes";
import s from "./Card.module.scss";

const App: Component = () => {
  const [store, setStore] = createStore({
    cards: ["Card 1", "Card 2", "Card 3"],
    focus: 0,
  });

  return (
    <div style="display: flex; flex-direction: column; gap: 1em;">
      <div style="display: flex; gap: 1em; justify-content: flex-end;">
        <ThemeProvider themes={themes} styles={styles} />
      </div>

      <div style="display: flex; gap: 1em;">
        <For each={store.cards}>
          {(card, index) => (
            <div
              onClick={() => setStore("focus", index())}
              classList={{
                [s.card]: true,
                [s.selected]: store.focus === index(),
              }}
            >
              {card}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
