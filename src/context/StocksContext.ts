import React from "react";

interface StocksContextValue {
  stocksData: StocksResponse | null;
  stocksDataOffset: number;
  setStocksDataOffset: React.Dispatch<React.SetStateAction<number>>;
  stocksDataSize: number;
  setStocksDataSize: React.Dispatch<React.SetStateAction<number>>;
  stocksDataOrderByCategory: string;
  setStocksDataOrderByCategory: React.Dispatch<React.SetStateAction<string>>;
  stocksDataOrderByDirection: string;
  setStocksDataOrderByDirection: React.Dispatch<
    React.SetStateAction<"asc" | "desc">
  >;
  stocksDataCountry: string;
  setStocksDataCountry: React.Dispatch<React.SetStateAction<string>>;
}

const StocksContext = React.createContext<StocksContextValue | undefined>(
  undefined
);

const useStocksContext = () => {
  const stocksContext = React.useContext(StocksContext);
  if (stocksContext === undefined) {
    throw new Error("useStocksContext must be inside StocksContext Provider");
  }
  return stocksContext;
};

export { StocksContext, useStocksContext };
