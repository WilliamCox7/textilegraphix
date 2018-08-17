export default function setFooter(footerId) {
  let bodyHeight = window.innerHeight;
  let footer = document.getElementById(footerId);
  if (footer) {
    footer.style.bottom = 'initial';
    let footerBottom = footer.getBoundingClientRect().bottom;
    if (footerBottom < bodyHeight) {
      footer.style.bottom = 0;
    }
  }
}
