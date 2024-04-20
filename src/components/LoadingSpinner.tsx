import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "grid",
      alignContent: "center",
      justifyItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
