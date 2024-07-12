import React from "react";
import { CircularProgress, Box } from "@mui/material";

type LoadingSpinnerType = {
  isLoading: boolean;
};

// TODO: make it float
const LoadingSpinner = ({ isLoading }: LoadingSpinnerType) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return null;
};

export default LoadingSpinner;
