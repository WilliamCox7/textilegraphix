export default function sortBestSeller(a, b) {
  if (a.ranking > b.ranking) return -1;
  else if (b.ranking > a.ranking) return 1;
  return 0;
}
