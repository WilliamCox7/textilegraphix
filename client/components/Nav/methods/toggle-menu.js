export default function toggleMenu() {
  this.setState({menu: !this.state.menu}, () => {
    this.state.menu
      ? document.body.style.position = 'fixed'
      : document.body.style.position = 'inherit';
  });
}
