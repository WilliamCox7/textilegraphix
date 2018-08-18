export default function updOrder(e, order) {
  if (!isNaN(e.target.value)) {
    let updOrder = Object.assign({}, order);
    updOrder[e.target.name] = Number(e.target.value);
    updOrder.quantity = 0;
    if (updOrder.XS) updOrder.quantity += updOrder.XS;
    if (updOrder.S) updOrder.quantity += updOrder.S;
    if (updOrder.M) updOrder.quantity += updOrder.M;
    if (updOrder.L) updOrder.quantity += updOrder.L;
    if (updOrder.XL) updOrder.quantity += updOrder.XL;
    if (updOrder.XL2) updOrder.quantity += updOrder.XL2;
    if (updOrder.XL3) updOrder.quantity += updOrder.XL3;
    if (updOrder.XL4) updOrder.quantity += updOrder.XL4;
    if (updOrder.XL5) updOrder.quantity += updOrder.XL5;
    this.calculateCost(updOrder);
  }
}
