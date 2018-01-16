export function downloadMockup() {
  var html = document.getElementsByClassName("Mockup")[0];
  html2canvas(html).then((canvas) => {
    var a = document.createElement('a');
    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    a.download = 'mockup.jpg';
    a.click();
  });
}
