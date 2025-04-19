import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";

const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Button
        className="btn-switcher"
        variant="outlined"
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        To {mode === "light" ? "dark" : "light"} theme
      </Button>
    </>
  );
};

export default ThemeToggle;
