import { handleError } from '../../_shared_modules';

export function downloadMockup() {
  var html = document.getElementsByClassName("Mockup")[0];
  html2canvas(html).then((canvas) => {
    if (canvas) {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = 'mockup.jpg';
      a.click();
    } else {
      handleError({
        path: '/client/components/ProductModule/modules/download-mockup',
        response: { html: html ? true : false },
        subject: 'html2canvas did not provide a canvas for a customer'
      });
    }
  });
}
