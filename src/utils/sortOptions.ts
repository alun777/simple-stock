export interface SortOption {
  direction: "asc" | "desc";
  category: string;
  label: string;
}
const sortOptions: SortOption[] = [
  {
    direction: "desc",
    category: "market_cap",
    label: "Market Cap High to Low",
  },
  {
    direction: "asc",
    category: "market_cap",
    label: "Market Cap Low to High",
  },
];

export default sortOptions;
