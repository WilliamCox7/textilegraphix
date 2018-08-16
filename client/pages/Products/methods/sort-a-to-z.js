export default function sortAtoZ(a, b) {
  if (a.brand < b.brand) return -1;
  else if (b.brand < a.brand) return 1;
  return 0;
}
