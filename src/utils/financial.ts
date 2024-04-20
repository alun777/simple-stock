const generateMarketCapString = (n: number) => {
  const tstr = Math.trunc(n).toString();
  const mag = tstr.length;

  if (mag > 12) {
    return `${tstr.substring(0, tstr.length - 12)}.${tstr.substring(
      tstr.length - 12,
      tstr.length - 11
    )}T`;
  }
  if (mag > 9) {
    return `${tstr.substring(0, tstr.length - 9)}.${tstr.substring(
      tstr.length - 9,
      tstr.length - 8
    )}B`;
  }
  if (mag > 6) {
    return `${tstr.substring(0, tstr.length - 6)}.${tstr.substring(
      tstr.length - 6,
      tstr.length - 5
    )}M`;
  }
  if (mag > 3) {
    return `${tstr.substring(0, tstr.length - 3)}.${tstr.substring(
      tstr.length - 3,
      tstr.length - 2
    )}K`;
  }
  return tstr;
};
export { generateMarketCapString };
