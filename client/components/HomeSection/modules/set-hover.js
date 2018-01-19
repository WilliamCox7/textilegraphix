// for each HomeSection there is a link with an svg, this is used to set the state of the link to true or false
// this is done instead of css because the link contains an svg which cannot be easily manipulated in React

export function setHover() {
  this.setState({link: !this.state.link});
}
