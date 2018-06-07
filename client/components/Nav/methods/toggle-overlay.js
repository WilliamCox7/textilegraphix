export default function toggleOverlay() {
  this.setState({overlay: !this.state.overlay}, () => {
    let className;
    if (window.location.pathname === '/') className = 'Home';
    else if (window.location.pathname === '/products') className = 'Products';
    else if (window.location.pathname === '/support') className = 'Support';
    else if (window.location.pathname === '/order') className = 'Order';
    this.state.overlay
      ? document.getElementsByClassName(className)[0].style.position = 'fixed'
      : document.getElementsByClassName(className)[0].style.position = 'inherit';
  });
}
