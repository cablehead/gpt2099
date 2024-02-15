export { default as styles } from "./styles.module.scss";

export const themes = {
  system_theme_config: {
    dark: "dark",
    light: "light",
  },
  themes: {
    dark: {
      config: {
        icon: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbW9vbi1zdGFyIj48cGF0aCBkPSJNMTIgM2E2IDYgMCAwIDAgOSA5IDkgOSAwIDEgMS05LTlaIi8+PHBhdGggZD0iTTE5IDN2NCIvPjxwYXRoIGQ9Ik0yMSA1aC00Ii8+PC9zdmc+",
        browser_theme_color: "#110000",
      },
      vars: {
        foreground: "#E5E8EE",
        background: "#1D202E",
        "foreground-reverse": "#1D202E",
        "background-reverse": "#E5E8EE",
        highlight: "#D07697",
        selected: "#6195FF",
      },
    },
    light: {
      config: {
        icon: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtc3VuIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTEyIDJ2MiIvPjxwYXRoIGQ9Ik0xMiAyMHYyIi8+PHBhdGggZD0ibTQuOTMgNC45MyAxLjQxIDEuNDEiLz48cGF0aCBkPSJtMTcuNjYgMTcuNjYgMS40MSAxLjQxIi8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PHBhdGggZD0ibTYuMzQgMTcuNjYtMS40MSAxLjQxIi8+PHBhdGggZD0ibTE5LjA3IDQuOTMtMS40MSAxLjQxIi8+PC9zdmc+",
        browser_theme_color: "#f5f5f5",
      },
      vars: {
        foreground: "#1D202E",
        background: "#E5E8EE",
        "foreground-reverse": "#E5E8EE",
        "background-reverse": "#1D202E",
        highlight: "#D07697",
        selected: "#6195FF",
      },
    },
  },
};

export const calculate_variants = (name: string, value: string) => {
  // if the current value is a hex color
  // add complementary transparencies
  let pattern = /^#[0-9A-F]{6}$/i;
  if (value.match(pattern)) {
    return {
      [name + "-a1"]: value + "f2", // 95%
      [name + "-a2"]: value + "99", // 60%
      [name + "-a3"]: value + "4d", // 30%
      [name + "-a4"]: value + "17", // 9%
    };
  }
  return {};
};
