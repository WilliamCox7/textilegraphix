export default function cancelBuilder() {
  this.setState({builder: false, overlay: false}, () => {
    let className;
    if (window.location.pathname === '/') className = 'Home';
    else if (window.location.pathname === '/products') className = 'Products';
    else if (window.location.pathname === '/support') className = 'Support';
    else if (window.location.pathname === '/order') className = 'Order';
    document.getElementsByClassName(className)[0].style.position = 'inherit';
  });
}
