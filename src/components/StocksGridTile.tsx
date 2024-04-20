import { Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { generateMarketCapString } from "../utils/financial";
import RadarGraph from "./RadarGraph";
import { useHover } from "usehooks-ts";
import { useRef } from "react";

export interface StocksGridTileProps {
  data: StocksItem;
}

const StocksGridTile = ({ data }: StocksGridTileProps) => {
  const theme = useTheme();
  const isOverLargeBreakpoint = useMediaQuery(theme.breakpoints.up("lg"));
  const hoverRef = useRef(null);
  const isHovering = useHover(hoverRef);

  const name = data.name ? data.name : "N/A";
  const lastPrice =
    data.grid.data.share_price && data.grid.data.currency_info
      ? `${data.grid.data.currency_info.primary_trading_item_currency_symbol}${data.grid.data.share_price}`
      : "N/A";
  const sevenDayReturn = data.grid.data.return_7d
    ? `${data.grid.data.return_7d.toFixed(2)}%`
    : "N/A";
  const oneYearReturn = data.grid.data.return_1yr_abs
    ? `${data.grid.data.return_1yr_abs.toFixed(2)}%`
    : "N/A";
  const marketCap =
    data.grid.data.market_cap && data.grid.data.currency_info
      ? `${
          data.grid.data.currency_info.primary_trading_item_currency_symbol
        }${generateMarketCapString(data.grid.data.market_cap)}`
      : "N/A";
  const analystsTarget =
    data.grid.data.price_target && data.grid.data.currency_info
      ? `${
          data.grid.data.currency_info.primary_trading_item_currency_symbol
        }${data.grid.data.price_target.toFixed(2)}`
      : "N/A";
  const valuation = data.grid.data.pe
    ? `PE ${data.grid.data.pe.toFixed(1)}x`
    : "N/A";
  const growth = data.grid.data.revenue_growth_annual
    ? `E ${data.grid.data.revenue_growth_annual.toFixed(1)}%`
    : "N/A";
  const industry =
    data.grid.data.primary_industry && data.grid.data.primary_industry.name
      ? data.grid.data.primary_industry.name
      : "N/A";

  const radarData = Object.entries(data.score.data)
    .slice(0, -2)
    .map((item) => {
      return {
        label: item[0] as string,
        value: item[1] as number,
      };
    });
  const radarSize = Math.max(...radarData.map((item) => item.value)) + 1;

  return (
    <Box
      sx={{
        position: "relative",
        width: isOverLargeBreakpoint ? "270px" : "100%",
        height: "310px",
        borderRadius: "8px",
        boxShadow: "rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
        cursor: "pointer",
      }}
      ref={hoverRef}
    >
      {data.grid.data.main_thumb ? (
        <Box
          component='img'
          sx={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            position: "absolute",
            borderRadius: "8px",
            opacity: "0.1",
          }}
          alt="The company's representative thumbnail"
          src={data.grid.data.main_thumb}
        />
      ) : null}
      {isHovering ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "50px 1fr 50px",
            height: "100%",
            width: "100%",
            padding: "12px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "24px min-content",
              gap: "24px",
              alignContent: "center",
            }}
          >
            {data.grid.data.main_header ? (
              <Box
                component='img'
                sx={{
                  height: "30px",
                  width: "30px",
                }}
                alt="The company's icon"
                src={data.grid.data.main_header}
              />
            ) : null}
            <Chip label={industry} color='default' />
          </Box>
          <Box>
            <Typography variant='body2'>
              {data.grid.data.description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 1fr",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridAutoFlow: "row",
            }}
          >
            <Box>
              <Typography sx={{ opacity: 0.7 }} variant='caption'>
                P/E
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ opacity: 0.7 }} variant='caption'>
                Growth
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ opacity: 0.7 }} variant='caption'>
                Analyst Target
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>{valuation}</Typography>
            </Box>
            <Box>
              <Typography variant='caption' noWrap textAlign={"center"}>
                {growth}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>{analystsTarget}</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "50px 1fr 50px",
            height: "100%",
            width: "100%",
            padding: "12px",
          }}
        >
          <Box
            sx={{
              display: "grid",
            }}
          >
            <Typography
              variant='h6'
              component='h2'
              sx={{ lineHeight: "1.2" }}
              noWrap
            >
              {name}
            </Typography>
            <Typography sx={{ opacity: "0.7" }} variant='caption' noWrap>
              {marketCap}
            </Typography>
          </Box>
          <Box sx={{ width: "200px", height: "180px", margin: "0 auto" }}>
            <RadarGraph radarData={radarData} size={radarSize} />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 1fr",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridAutoFlow: "row",
            }}
          >
            <Box>
              <Typography sx={{ opacity: 0.7 }} variant='caption'>
                BHP
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ opacity: 0.7 }} variant='caption'>
                7D
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ opacity: 0.7 }} variant='caption'>
                1Y
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>{lastPrice}</Typography>
            </Box>
            <Box>
              <Typography variant='caption'>{sevenDayReturn}</Typography>
            </Box>
            <Box>
              <Typography variant='caption'>{oneYearReturn}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StocksGridTile;
