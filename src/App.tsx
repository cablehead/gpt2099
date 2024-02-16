import { Component, For, Match, onCleanup, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";

import { ThemeProvider } from "solid-theme-provider";

import Editor from "./Editor";

import { calculate_variants, styles, themes } from "./themes";
import { matchKeyEvent } from "./util";
import s from "./Card.module.scss";

const App: Component = () => {
  enum Mode {
    Main = "main",
    Add = "add",
    Edit = "edit",
  }

  const [store, setStore] = createStore({
    cards: ["Card 1", "Card 2", "Card 3"],
    focus: 0,
    mode: Mode.Main,
  });

  const endEdit = (text?: string) => {
    setStore(produce((state) => {
      if (text !== undefined) {
        state.cards[state.focus] = text;
      }
      state.mode = Mode.Main;
    }));
  };

  const endAdd = (text?: string) => {
    setStore(produce((state) => {
      if (text) {
        state.cards.push(text);
        state.focus = state.cards.length - 1;
      }
      state.mode = Mode.Main;
    }));
  };

  const emitHttpPost = async () => {
    const focusedCard = store.cards[store.focus];
    try {
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ card: focusedCard }),
      });

      if (!response.ok) {
        // Handle response error
        console.error("HTTP Request failed", await response.text());
      } else {
        // Process response
        // Process response as plain text
        console.log("Success:", await response.text());
      }
    } catch (error) {
      // Handle network error
      console.error("HTTP Request error:", error);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (true) {
      // Edit
      case matchKeyEvent(event, { code: "Enter" }):
        event.preventDefault();
        setStore("mode", Mode.Edit);
        return;

      // Add
      case matchKeyEvent(event, { shift: true, code: "KeyA" }):
        event.preventDefault();
        setStore("mode", Mode.Add);
        return;

      case matchKeyEvent(event, { code: "Space" }):
        event.preventDefault();
        emitHttpPost();
        return;

        // Nav Right
      case matchKeyEvent(event, { code: "KeyL" }):
      case matchKeyEvent(event, { code: "ArrowRight" }):
        event.preventDefault();
        setStore(
          "focus",
          (prev) => prev < store.cards.length - 1 ? prev + 1 : prev,
        );
        return;

      // Nav Left
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

        <Switch>
          <Match when={store.mode === Mode.Edit}>
            <Editor text={store.cards[store.focus]} fin={endEdit} />
          </Match>
          <Match when={store.mode === Mode.Add}>
            <Editor text="" fin={endAdd} />
          </Match>
        </Switch>
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
