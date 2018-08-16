export default function sortDefault(a, b) {
  if (a.type > b.type) return -1;
  else if (b.type > a.type) return 1;
  return 0;
}
