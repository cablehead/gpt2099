import { Component, For, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

import { ThemeProvider } from "solid-theme-provider";

import { calculate_variants, styles, themes } from "./themes";
import { matchKeyEvent } from "./util";
import s from "./Card.module.scss";

const App: Component = () => {
  const [store, setStore] = createStore({
    cards: ["Card 1", "Card 2", "Card 3"],
    focus: 0,
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (true) {
      // Right
      case matchKeyEvent(event, { code: "KeyL" }):
      case matchKeyEvent(event, { code: "ArrowRight" }):
        setStore("focus", (prev) =>
          prev < store.cards.length - 1 ? prev + 1 : prev
        );
        return;
      // Left
      case matchKeyEvent(event, { code: "KeyH" }):
      case matchKeyEvent(event, { code: "ArrowLeft" }):
        setStore("focus", (prev) => (prev > 0 ? prev - 1 : 0));
        return;
    }
  };

  document.addEventListener("keydown", handleKeyPress);

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div style="display: flex; flex-direction: column; gap: 1em; height:100%;">
      <div style="flex-grow: 1;">
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
      <div style="display: flex; gap: 1em; justify-content: flex-end;">
        <ThemeProvider
          calculate_variants={calculate_variants}
          themes={themes}
          styles={styles}
        />
      </div>
    </div>
  );
};

export default App;
