import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useStocksContext } from "../context/StocksContext";
import StocksTable from "../components/StocksTable";
import { SyntheticEvent, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import StocksGrid from "../components/StocksGrid";
import countryCodes, { CountryCode } from "../utils/countries";
import sortOptions, { SortOption } from "../utils/sortOptions";

const StocksPageLayout = () => {
  const {
    stocksData,
    stocksDataCountry,
    setStocksDataCountry,
    setStocksDataOrderByCategory,
    setStocksDataOrderByDirection,
  } = useStocksContext();

  const [displayMode, setDisplayMode] = useState<"table" | "grid">("table");

  const [countryCode, setCountryCode] = useState<CountryCode | null>(
    countryCodes.find((code) => code.code === stocksDataCountry) ||
      countryCodes[0]
  );
  const [countryInputValue, setCountryInputValue] = useState(
    countryCodes[0].label
  );

  const [sortOption, setSortOption] = useState<SortOption | null>(
    sortOptions[0]
  );
  const [sortInputValue, setSortInputValue] = useState(sortOptions[0].label);

  const countryCodeChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newValue: CountryCode | null
  ) => {
    event?.stopPropagation();
    setCountryCode(newValue);
    if (newValue) {
      setStocksDataCountry(newValue.code);
    }
  };

  const countryInputChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    event?.stopPropagation();
    setCountryInputValue(newInputValue);
  };

  const sortOptionChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newValue: SortOption | null
  ) => {
    event?.stopPropagation();
    setSortOption(newValue);
    if (newValue) {
      setStocksDataOrderByCategory(newValue.category);
      setStocksDataOrderByDirection(newValue.direction);
    }
  };

  const sortInputChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    event?.stopPropagation();
    setSortInputValue(newInputValue);
  };

  return (
    <Box
      sx={{
        gridArea: "1 / 2 / 1 / 3",
        padding: "12px 24px",
        width: "100%",
      }}
    >
      <Box>
        <Autocomplete
          value={countryCode}
          onChange={countryCodeChangeHandler}
          inputValue={countryInputValue}
          onInputChange={countryInputChangeHandler}
          id='controllable-states-demo'
          options={countryCodes}
          sx={{ width: 280 }}
          size='small'
          renderInput={(params) => <TextField {...params} label='Country' />}
        />
      </Box>
      <Typography
        sx={{ padding: "12px 0" }}
        variant='h4'
        component='h1'
      >{`Largest ${countryCode?.label} Stocks by Market Cap`}</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "fit-content fit-content 1fr",
        }}
      >
        <Box
          sx={{
            display: "grid",
            padding: "8px 0",
            gridTemplateRows: "1fr",
            gridTemplateColumns: "min-content 1fr min-content",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Autocomplete
              value={sortOption}
              onChange={sortOptionChangeHandler}
              inputValue={sortInputValue}
              onInputChange={sortInputChangeHandler}
              id='controllable-states-demo'
              options={sortOptions}
              sx={{ width: 280 }}
              size='small'
              renderInput={(params) => (
                <TextField {...params} label='Sorting' />
              )}
            />
          </Box>
          <Box sx={{ padding: "0 auto" }}>
            <Typography
              sx={{ opacity: 0.7, marginRight: "100px" }}
              variant='caption'
            >{`${stocksData?.meta.total_records} companies`}</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "min-content min-content",
              justifyContent: "end",
            }}
          >
            <IconButton
              aria-label='set data to table display'
              color={displayMode === "table" ? "primary" : "default"}
              onClick={() => setDisplayMode("table")}
            >
              <TableRowsIcon />
            </IconButton>
            <IconButton
              aria-label='set data to grid display'
              color={displayMode === "grid" ? "primary" : "default"}
              onClick={() => setDisplayMode("grid")}
            >
              <GridViewIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider />
        {stocksData && displayMode === "table" ? (
          <StocksTable stocks={stocksData} />
        ) : null}
        {stocksData && displayMode === "grid" ? (
          <StocksGrid stocks={stocksData} />
        ) : null}
      </Box>
    </Box>
  );
};

export default StocksPageLayout;
