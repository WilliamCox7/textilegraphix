export default function sortHighestPrice(a, b) {
  if (a.costPerShirt > b.costPerShirt) return -1;
  else if (b.costPerShirt > a.costPerShirt) return 1;
  return 0;
}
