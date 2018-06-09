import scrollToTop from './scroll-to-top';

export default function setProduct(payload, editOrder) {
  let init = editOrder ? payload : this.state.productBuilderInit;
  let product = editOrder ? payload.product : payload;
  if (!editOrder) this.updateCost(product);
  this.props.initBuilder(init, product, editOrder);
  document.getElementById('current-page').style.position = 'fixed';
  document.getElementById('current-page').style.opacity = 0;
  scrollToTop();
}
