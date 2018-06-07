export default function storeFile(e) {
  let newState = Object.assign({}, this.state);
  var reader = new FileReader();
  var fileName = e.currentTarget.files[0].name;
  reader.onloadend = () => {
    newState.files.push({data: reader.result, name: fileName});
    this.setState(newState);
  }
  reader.readAsDataURL(e.currentTarget.files[0]);
  document.getElementById('uploadButton').value = '';
}
