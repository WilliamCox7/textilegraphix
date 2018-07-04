import { axios } from '../../../packages';

export default function replaceImageWithBase64(url, hex, index) {
  let guid = createGuid();
  let ext = getExtFromUrl(url);
  return storeTmpImage(url, guid, ext)
  .then(() => this.props.replaceImage(`/tmp/${guid}.${ext}`, hex, index))
  // .then((response) => getDataUri(`/tmp/${guid}.${ext}`))
  // .then((data) => this.props.replaceImage(data, hex, index))
  // .then(() => removeTmpImage(guid, ext))
  .catch((err) => {
    console.log(err);
  });
}

function createGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4();
}

function getExtFromUrl(url) {
  let parts = url.split(".");
  return parts[parts.length-1];
}

function storeTmpImage(url, guid, ext) {
  return axios.post('/tmp-image/store', {
    url: url,
    guid: guid,
    ext: ext
  });
}

function getDataUri(url) {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext('2d').drawImage(this, 0, 0);
      resolve(canvas.toDataURL('image/jpeg'));
    };
    image.src = url;
  });
}

function removeTmpImage(guid, ext) {
  return axios.post('/tmp-image/remove', {
    guid: guid,
    ext: ext
  });
}
