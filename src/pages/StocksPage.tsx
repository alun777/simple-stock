import { useCallback, useEffect, useState } from "react";
import { getStockData } from "../api/getStockData";
import StocksTemplate from "./StocksPageLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { StocksContext } from "../context/StocksContext";
import { Box } from "@mui/material";

const StocksPage = () => {
  const [stocksData, setStocksData] = useState<StocksResponse>();
  const [stocksDataOffset, setStocksDataOffset] = useState<number>(0);
  const [stocksDataSize, setStocksDataSize] = useState<number>(25);
  const [stocksDataOrderByCategory, setStocksDataOrderByCategory] =
    useState<string>("market_cap");
  const [stocksDataOrderByDirection, setStocksDataOrderByDirection] = useState<
    "asc" | "desc"
  >("desc");
  const [stocksDataCountry, setStocksDataCountry] = useState<string>("AU");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const generateRulesPayload = () => {
      const rules = [
        ["order_by", stocksDataOrderByCategory, stocksDataOrderByDirection],
        ["grid_visible_flag", "=", true],
        ["market_cap", "is_not_null"],
        ["primary_flag", "=", true],
        ["is_fund", "=", false],
        ["aor", [["country_name", "in", [stocksDataCountry]]]],
      ];

      return JSON.stringify(rules);
    };

    const resp = await getStockData({
      id: 1,
      no_result_if_limit: false,
      offset: stocksDataOffset,
      size: stocksDataSize,
      state: "read",
      rules: generateRulesPayload(),
    });

    if ("meta" in resp && "data" in resp) {
      setStocksData(resp);
    }

    setIsLoading(false);
  }, [
    stocksDataOffset,
    stocksDataSize,
    stocksDataOrderByCategory,
    stocksDataOrderByDirection,
    stocksDataCountry,
  ]);

  useEffect(() => {
    fetchData();
  }, [
    fetchData,
    stocksDataOffset,
    stocksDataSize,
    stocksDataOrderByCategory,
    stocksDataOrderByDirection,
    stocksDataCountry,
  ]);

  return (
    <>
      {stocksData && !isLoading ? (
        <StocksContext.Provider
          value={{
            stocksData,
            stocksDataOffset,
            setStocksDataOffset,
            stocksDataSize,
            setStocksDataSize,
            stocksDataOrderByCategory,
            setStocksDataOrderByCategory,
            stocksDataOrderByDirection,
            setStocksDataOrderByDirection,
            stocksDataCountry,
            setStocksDataCountry,
          }}
        >
          <StocksTemplate />
        </StocksContext.Provider>
      ) : (
        <Box
          sx={{
            gridArea: "1 / 2 / 1 / 3",
            width: "100%",
          }}
        >
          <LoadingSpinner />
        </Box>
      )}
    </>
  );
};

export default StocksPage;
