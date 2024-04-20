import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
} from "@mui/material";

import StocksTableRow from "./StocksTableRow";
import StocksTablePaginationActions from "./StocksTablePagination";
import { useState } from "react";
import { useStocksContext } from "../context/StocksContext";

export interface StocksTableProps {
  stocks: StocksResponse;
}

const StocksTable = ({ stocks }: StocksTableProps) => {
  const {
    stocksDataOffset,
    setStocksDataOffset,
    stocksDataSize,
    setStocksDataSize,
  } = useStocksContext();

  const [page, setPage] = useState<number>(stocksDataOffset / stocksDataSize);
  const [rowsPerPage, setRowsPerPage] = useState<number>(stocksDataSize);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    event?.stopPropagation();
    setPage(newPage);
    setStocksDataOffset(newPage * stocksDataSize);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event?.stopPropagation();
    const newPageSize = parseInt(event.target.value, 10);
    setRowsPerPage(newPageSize);
    setPage(0);
    setStocksDataOffset(0);
    setStocksDataSize(newPageSize);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label='Table of stock data'>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Last Price</TableCell>
            <TableCell>7D Return</TableCell>
            <TableCell>1Y Return</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>Analysts Target</TableCell>
            <TableCell>Valuation</TableCell>
            <TableCell>Growth</TableCell>
            <TableCell>Div Yield</TableCell>
            <TableCell>Industry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.data.map((item, i) => {
            return <StocksTableRow key={i} data={item} />;
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={10}
              count={stocks.meta.total_records}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={StocksTablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default StocksTable;
