type StocksItemScore = {
  data: {
    value: number;
    income: number;
    health: number;
    past: number;
    future: number;
    management: number;
    misc: number;
    total: number;
    sentence: string;
  };
};

type StocksItemIndustry = {
  id: number;
  name: string;
};

type StocksItemCurrencyInfo = {
  reporting_unit_abs: number;
  reporting_currency_iso: string;
  trading_item_currency_iso: string;
  reporting_unit_text: string;
  reporting_unit_text_abs: string;
  primary_trading_item_currency_symbol: string;
  reporting_currency_symbol: string;
  reporting_unit: number;
  trading_item_currency_symbol: string;
  primary_trading_item_currency_iso: string;
};

type StocksItemGrid = {
  data: {
    year_founded: number | null;
    description: string | null;
    logo_url: string | null;
    share_price: number | null;
    market_cap: number | null;
    pe: number | null;
    pb: number | null;
    price_to_sales: number | null;
    analyst_count: number | null;
    return_1d: number | null;
    return_7d: number | null;
    return_1yr_abs: number | null;
    price_target: number | null;
    growth_3y: number | null;
    net_income_growth_annual: number | null;
    revenue_growth_annual: number | null;
    dividend_yield: number | null;
    primary_industry: StocksItemIndustry | null;
    currency_info: StocksItemCurrencyInfo | null;
    main_thumb: string | null;
    main_header: string | null;
  };
};

type StocksItem = {
  id: number;
  company_id: string;
  trading_item_id: number;
  name: string;
  slug: string;
  exchange_symbol: string;
  ticker_symbol: string;
  unique_symbol: string;
  primary_ticker: boolean;
  last_updated: number;
  canonical_url: string;
  primary_canonical_url: string;
  is_searchable: boolean;
  isin_symbol: string;
  score: StocksItemScore;
  grid: StocksItemGrid;
};

type StocksResponse = {
  data: StocksItem[];
  meta: {
    total_records: number;
    real_total_records: number;
    state: string;
    noResultIfLimit: boolean;
    pe: number;
    return_1yr_abs: number;
    return_7d: number;
  };
};

type CoercedStocksResponse =
  | (Omit<Response, "json"> & {
      status: 200;
      json: () => StocksResponse | PromiseLike<StocksResponse>;
    })
  | (Omit<Response, "json"> & {
      status: 400;
      json: () => BadRequest | PromiseLike<BadRequest>;
    });

type BadRequest = { code: "bad_request"; message: string };
