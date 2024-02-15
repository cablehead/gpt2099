import { Component } from "solid-js";

const Editor: Component = () => {
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
          spellcheck={false}
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            outline: "none",
            border: "none",
          }}
          placeholder="..."
        >
          hai
        </textarea>
      </div>
    </div>
  );
};

export default Editor;
