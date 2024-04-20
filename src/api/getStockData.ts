const STOCK_API_BASEURL = "https://simplywall.st/api";

export interface GetStockDataProps {
  id: number;
  no_result_if_limit: boolean;
  offset: number;
  size: number;
  state: string;
  rules: string;
}

const getStockData = (props: GetStockDataProps) => {
  return fetch(`${STOCK_API_BASEURL}/grid/filter?include=grid,score`, {
    method: "POST",
    body: JSON.stringify(props),
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      sws: "fe-challenge",
    },
  }).then((res) => gridResponseHandler(res));
};

const gridResponseHandler = (response: Response) => {
  const res = response as CoercedStocksResponse;
  return processGridResponse(res);
};

const processGridResponse = (res: CoercedStocksResponse) => {
  if (res.status === 200) return res.json();
  if (res.status === 400) return res.json();
  return Error("Unhandled response code");
};

export { getStockData };
