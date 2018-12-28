export default function updOrder(e, form) {
  if (!isNaN(e.target.value)) {
    let updOrder = Object.assign({}, form);
    updOrder[e.target.name] = Number(e.target.value);
    updOrder.quantity = 0;
    if (updOrder.XS) updOrder.quantity += Number(updOrder.XS);
    if (updOrder.S) updOrder.quantity += Number(updOrder.S);
    if (updOrder.M) updOrder.quantity += Number(updOrder.M);
    if (updOrder.L) updOrder.quantity += Number(updOrder.L);
    if (updOrder.XL) updOrder.quantity += Number(updOrder.XL);
    if (updOrder.XL2) updOrder.quantity += Number(updOrder.XL2);
    if (updOrder.XL3) updOrder.quantity += Number(updOrder.XL3);
    if (updOrder.XL4) updOrder.quantity += Number(updOrder.XL4);
    if (updOrder.XL5) updOrder.quantity += Number(updOrder.XL5);
    this.calculateCost(updOrder);
  }
}
