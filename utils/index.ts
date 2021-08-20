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