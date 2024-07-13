import React from "react";
import { CircularProgress, Box } from "@mui/material";

// TODO: make it float
const LoadingSpinner = ({ size }: { size?: number }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        width: size,
        height: size,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
