// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#403c51",
    900: "#282a36",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#8be9fd",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};
const mocha = {
  Rosewater: "#f5e0dc",
  Flamingo: "#f2cdcd",
  Pink: "#f5c2e7",
  Mauve: "#cba6f7",
  Red: "#f38ba8",
  Maroon: "#eba0ac",
  Peach: "#fab387",
  Yellow: "#f9e2af",
  Green: "#a6e3a1",
  Teal: "#94e2d5",
  Sky: "#89dceb",
  Sapphire: "#74c7ec",
  Blue: "#89b4fa",
  Lavender: "#b4befe",
  Text: "#cdd6f4",
  Subtext1: "#bac2de",
  Subtext0: "#a6adc8",
  Overlay2: "#9399b2",
  Overlay1: "#7f849c",
  Overlay0: "#6c7086",
  Surface2: "#585b70",
  Surface1: "#45475a",
  Surface0: "#313244",
  Base: "#1e1e2e",
  Mantle: "#181825",
  Crust: "#11111b",
};
const Latte = {
  Rosewater: "#dc8a78",
  Flamingo: "#dd7878",
  Pink: "#ea76cb",
  Mauve: "#8839ef",
  Red: "#d20f39",
  Maroon: "#e64553",
  Peach: "#fe640b",
  Yellow: "#df8e1d",
  Green: "#40a02b",
  Teal: "#179299",
  Sky: "#04a5e5",
  Sapphire: "#209fb5",
  Blue: "#1e66f5",
  Lavender: "#7287fd",
  Text: "#4c4f69",
  Subtext1: "#5c5f77",
  Subtext0: "#6c6f85",
  Overlay2: "#7c7f93",
  Overlay1: "#8c8fa1",
  Overlay0: "#9ca0b0",
  Surface2: "#acb0be",
  Surface1: "#bcc0cc",
  Surface0: "#ccd0da",
  Base: "#eff1f5",
  Mantle: "#e6e9ef",
  Crust: "#dce0e8	",
};
// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            ...mocha,
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: mocha.Sky,
              light: colorTokens.primary[800],
            },
            secondary: {
              main: mocha.Lavender,
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: mocha.Crust,
              alt: mocha.Base,
            },
            text: {
              primary: mocha.Text,
              secondary: mocha.Subtext1,
              disabled: mocha.Overlay1,
            },
            error: {
              main: mocha.Red,
            },
          }
        : {
            ...Latte,
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: Latte.Lavender,
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: Latte.Crust,
              alt: Latte.Base,
            },
          }),
    },
    boxShadow: {
      main: "0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      alt: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
