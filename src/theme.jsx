import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    dark: {
      shadowRing: "0 0 20px 3px rgba(0, 0, 0, 0.5)",
      palette: {
        neutral: {
          800: "#2F4968",
        },
        background: {
          body: "#32343d",
          surface: "#021c35b5",
        },
        text: {
          primary: "#4295e8",
          secondary: "#89c4ff",
        },
        primary: {
          500: "#1976d2",
        },
        danger: {
          500: "#ef5350",
        },
      },
    },
    light: {
      shadowRing: "0 0 20px 3px rgba(160, 148, 148, 0.5)",

      palette: {
        background: {
          body: "#ececec",
          surface: "#9fa6ad4d",
        },
        text: {
          primary: "#4295e8",
          secondary: "#021c35b5",
        },
        primary: {
          500: "#1976d2",
        },
        danger: {
          500: "#d32f2f",
        },
      },
    },
  },
});

export default theme;
