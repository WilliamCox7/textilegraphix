export default function prepareAttachments() {
  let attachments = [];
  this.props.cart.orders.forEach((order) => {
    attachments.push({
      filename: `${order.guid}-front.png`,
      path: order.mockup[0]
    });
    attachments.push({
      filename: `${order.guid}-back.png`,
      path: order.mockup[1]
    });
    order.uploaded.front.forEach((upload, i) => {
      var ext = upload.name.split('.').pop();
      attachments.push({
        filename: `${order.guid}-${i+1}-upload-front.${ext}`,
        path: upload.src
      });
    });
    order.uploaded.back.forEach((upload, i) => {
      var ext = upload.name.split('.').pop();
      attachments.push({
        filename: `${order.guid}-${i+1}-upload-back.${ext}`,
        path: upload.src
      });
    });
  });
  return attachments;
}
