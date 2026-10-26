export function formatNumber(num: number): string {
  let symbol = "";
  if (num < 1) {
    return num.toLocaleString(undefined, {
        maximumFractionDigits: 5
    });
  }
  if (num >= 1_000_000_000_000) {
    symbol = "T";
    num /= 1_000_000_000_000;
  } else if (num >= 1_000_000_000) {
    symbol = "B";
    num /= 1_000_000_000;
  } else if (num >= 1_000_000) {
    symbol = "M";
    num /= 1_000_000;
  }
  let formated = num.toLocaleString();
  let [decimal, floatingPoint] = formated.split(".");
  if (floatingPoint != undefined) {
    floatingPoint = floatingPoint.slice(0, 2);
    return decimal + "." + floatingPoint + symbol;
  }
  return decimal + symbol;
}
