export function storeFile(e) {
  var reader = new FileReader();
  var imgName = e.currentTarget.files[0].name;
  reader.onloadend = () => {
    this.props.addImage({src: reader.result, name: imgName}, this.props.nav.mockupnav.index);
  }
  reader.readAsDataURL(e.currentTarget.files[0]);
  document.getElementById('inputButton').value = '';
}
