export function formatPriceRu(
  num: number,
  fixed = 0,
  withRuSymbol = true
): string {
  const regexp = /(?<!\.\d*)\B(?=(\d{3})+(?!\d))/g;

  return num.toFixed(fixed)
    .replace(regexp, ' ')
    .concat(withRuSymbol ? ' ₽' : '');
}

export function declinationOFNumber(num: number, titles: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
}