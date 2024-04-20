import { TableRow, TableCell, Typography } from "@mui/material";

import { generateMarketCapString } from "../utils/financial";

export interface StocksTableRowProps {
  data: StocksItem;
}

const StocksTableRow = ({ data }: StocksTableRowProps) => {
  const name = data.name ? data.name : "N/A";
  const symbol = data.unique_symbol ? data.unique_symbol : "N/A";
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
    ? `${data.grid.data.revenue_growth_annual.toFixed(1)}%`
    : "N/A";
  const divYield = data.grid.data.dividend_yield
    ? `${data.grid.data.dividend_yield.toFixed(1)}%`
    : "N/A";
  const industry =
    data.grid.data.primary_industry && data.grid.data.primary_industry.name
      ? data.grid.data.primary_industry.name
      : "N/A";

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <Typography variant='body2'>{name}</Typography>
        <Typography variant='body2'>{symbol}</Typography>
      </TableCell>
      <TableCell>{lastPrice}</TableCell>
      <TableCell>{sevenDayReturn}</TableCell>
      <TableCell>{oneYearReturn}</TableCell>
      <TableCell>{marketCap}</TableCell>
      <TableCell>{analystsTarget}</TableCell>
      <TableCell>{valuation}</TableCell>
      <TableCell>{growth}</TableCell>
      <TableCell>{divYield}</TableCell>
      <TableCell>{industry}</TableCell>
    </TableRow>
  );
};

export default StocksTableRow;
