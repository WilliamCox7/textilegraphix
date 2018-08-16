export default function sortBestSeller(a, b) {
  if (a.rating > b.rating) return -1;
  else if (b.rating > a.rating) return 1;
  return 0;
}
