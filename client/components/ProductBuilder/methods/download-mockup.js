import { html2canvas, jszip, saveAs } from '../../../packages';

export default function downloadMockup() {
  var zip = new jszip();
  var folderName = "mockup-" + this.props.builder.product.number;
  var folder = zip.folder(folderName);
  var front = document.getElementById("front-side");
  var back = document.getElementById("back-side");
  var promises = [
    h2c(front)
    .then((data) => {
      let blob = dataURItoBlob(data);
      folder.file("front.jpeg", blob);
    }),
    h2c(back)
    .then((data) => {
      let blob = dataURItoBlob(data);
      folder.file("back.jpeg", blob);
    })
  ];
  Promise.all(promises).then(() => {
    zip.generateAsync({type: "blob"}).then((content) => {
      var zipName = folderName + ".zip";
      saveAs(content, zipName);
    });
  });
}

function h2c(element) {
  return html2canvas(element, { useCORS: true, logging: false })
  .then((canvas) => canvas.toDataURL("image/jpeg"))
  .catch((err) => console.log(err));
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}
