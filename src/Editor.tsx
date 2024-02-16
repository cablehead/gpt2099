import { Component, onMount } from "solid-js";

import { matchKeyEvent } from "./util";

const Editor: Component<{ text: string; fin: (text?: string) => void }> = (
  props,
) => {
  let textareaRef: HTMLTextAreaElement | undefined;

  onMount(() => {
    if (!textareaRef) return;
    textareaRef.focus();
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        "z-index": 1000,
        position: "absolute",
        top: 0,
        left: 0,
        padding: "0.5em",
      }}
    >
      <div
        style={{
          padding: "2ch",
          "border-radius": "0.5rem",
          height: "calc(100%)",
          "box-shadow": "0 0 6px var(--stp-background-reverse-a3)",
          background: "var(--stp-background-a1)",
        }}
      >
        <textarea
          ref={textareaRef}
          spellcheck={false}
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            outline: "none",
            border: "none",
          }}
          placeholder="..."
          value={props.text}
          onKeyDown={(event: KeyboardEvent) => {
            event.stopPropagation();
            event.stopImmediatePropagation();
            if (!textareaRef) return;

            switch (true) {
              case matchKeyEvent(event, { meta: true, code: "Enter" }):
                event.preventDefault();
                props.fin(textareaRef.value);
                return;
              case matchKeyEvent(event, { code: "Escape" }):
                event.preventDefault();
                props.fin();
                return;
            }
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
