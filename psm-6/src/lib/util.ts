export function precision(val: number) {
  if (!isFinite(val)) return 0;
  let e = 1, p = 0;
  while (Math.round(val * e) / e !== val) { e *= 10; p++; }
  return p;
}
