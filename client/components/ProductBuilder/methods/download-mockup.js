import { domtoimage, jszip, saveAs } from '../../../packages';

export default function downloadMockup() {
  var zip = new jszip();
  var folderName = "mockup-" + this.props.product.number;
  var folder = zip.folder(folderName);
  var front = document.getElementById("front-side");
  var back = document.getElementById("back-side");
  var promises = [
    domtoimage.toBlob(front).then((blob) => {
      folder.file("front.png", blob);
    }),
    domtoimage.toBlob(back).then((blob) => {
      folder.file("back.png", blob);
    })
  ];
  Promise.all(promises).then(() => {
    zip.generateAsync({type: "blob"}).then((content) => {
      var zipName = folderName + ".zip";
      saveAs(content, zipName);
    });
  });
}
