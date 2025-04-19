import React from "react";
import { Box } from "@mui/joy";

const PageContainer = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.vars.palette.background.body,
        color: "text.primary",
        borderRadius: "25px",
        boxShadow: "lg",
        padding: 2,
        xs: {
          padding: 0,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
