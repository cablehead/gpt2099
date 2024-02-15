import { Component, For, onCleanup, Show } from "solid-js";
import { createStore } from "solid-js/store";

import { ThemeProvider } from "solid-theme-provider";

import Editor from "./Editor";

import { calculate_variants, styles, themes } from "./themes";
import { matchKeyEvent } from "./util";
import s from "./Card.module.scss";

const App: Component = () => {
  const [store, setStore] = createStore({
    cards: ["Card 1", "Card 2", "Card 3"],
    focus: 0,
    isEdit: false,
  });

  const closeEditor = (text?: string) => {
    if (text !== undefined) {
      setStore("cards", store.focus, text);
    }
    setStore("isEdit", false);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (true) {
      // Enter - sets isEdit to true
      case matchKeyEvent(event, { meta: true, code: "Enter" }):
        event.preventDefault();
        setStore("isEdit", true);
        return;
      // Right
      case matchKeyEvent(event, { code: "KeyL" }):
      case matchKeyEvent(event, { code: "ArrowRight" }):
        event.preventDefault();
        setStore("focus", (prev) =>
          prev < store.cards.length - 1 ? prev + 1 : prev
        );
        return;
      // Left
      case matchKeyEvent(event, { code: "KeyH" }):
      case matchKeyEvent(event, { code: "ArrowLeft" }):
        event.preventDefault();
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
      <div style="flex-grow: 1; position: relative;">
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
        <Show when={store.isEdit}>
          <Editor text={store.cards[store.focus]} fin={closeEditor} />
        </Show>
      </div>
      <div style="display: flex;  align-items: center; justify-content: space-between; padding-top: 0.5em; border-top: 1px dotted var(--stp-foreground-a3);">
        <div>gpt2099</div>

        <div style="display: flex; justify-content: flex-end;">
          <ThemeProvider
            calculate_variants={calculate_variants}
            themes={themes}
            styles={styles}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
