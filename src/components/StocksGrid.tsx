import { Box, useMediaQuery, useTheme } from "@mui/material";
import StocksGridTile from "./StocksGridTile";

export interface StocksGridProps {
  stocks: StocksResponse;
}

const StocksGrid = (props: StocksGridProps) => {
  const theme = useTheme();
  const isOverLargeBreakpoint = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        paddingTop: "24px",
        display: "grid",
        gridTemplateColumns: isOverLargeBreakpoint
          ? "repeat(4, 1fr)"
          : "repeat(3, 1fr)",
        gap: "24px",
      }}
    >
      {props.stocks.data.map((item, i) => {
        return <StocksGridTile data={item} key={i} />;
      })}
    </Box>
  );
};

export default StocksGrid;
