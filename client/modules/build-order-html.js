import { React } from '../packages';

export default function buildOrderHtml(form, products) {

  let html = `
    <div>
      <h1>${form.projectName ? form.projectName : "Project Details"}</h1>
      <p style="margin: 5px 0px">${form.first} ${form.last}</p>
      <p style="margin: 5px 0px">${form.email}</p>
      <p style="margin: 5px 0px">${form.phone}</p>
      <p style="margin: 5px 0px">${form.company}</p>
      <br />
    </div>
  `;

  let totalCost = 0;

  products.map((product, i) => {

    totalCost += Number(product.total);

    html += `
      <div>
        <h1>${product.product.brand} ${product.product.number} (${product.guid})</h1>
        <h3>Quantity: ${product.quantity}</h3>
        ${product.XS ? '<p style="margin: 5px 0px">XS: ' + product.XS + '</p>' : ''}
        ${product.S ? '<p style="margin: 5px 0px">S: ' + product.S + '</p>' : ''}
        ${product.M ? '<p style="margin: 5px 0px">M: ' + product.M + '</p>' : ''}
        ${product.L ? '<p style="margin: 5px 0px">L: ' + product.L + '</p>' : ''}
        ${product.XL ? '<p style="margin: 5px 0px">XL: ' + product.XL + '</p>' : ''}
        ${product.XL2 ? '<p style="margin: 5px 0px">XL2: ' + product.XL2 + '</p>' : ''}
        ${product.XL3 ? '<p style="margin: 5px 0px">XL3: ' + product.XL3 + '</p>' : ''}
        ${product.XL4 ? '<p style="margin: 5px 0px">XL4: ' + product.XL4 + '</p>' : ''}
        <h3>Shirt Color: ${product.selectedColor}</h3>
        ${product.frontColors ? '<p style="margin: 5px 0px">Front Colors: ' + product.frontColors + '</p>' : ''}
        ${product.backColors ? '<p style="margin: 5px 0px">Back Colors: ' + product.backColors + '</p>' : ''}
        ${product.leftSleeveColors ? '<p style="margin: 5px 0px">Left Sleeve Colors: ' + product.leftSleeveColors + '</p>' : ''}
        ${product.rightSleeveColors ? '<p style="margin: 5px 0px">Right Sleeve Colors: ' + product.rightSleeveColors + '</p>' : ''}
        ${product.foldedAndBagged || product.insideTagPrinting || product.hemTags ? '<h3>Add Ons:</h3>' : ''}
        ${product.foldedAndBagged ? '<p style="margin: 5px 0px">Folded and Bagged</p>' : ''}
        ${product.insideTagPrinting ? '<p style="margin: 5px 0px">Inside Tag Printing</p>' : ''}
        ${product.hemTags ? '<p style="margin: 5px 0px">Hem Tags</p>' : ''}
        <h2>Total: $${product.total}</h2>
        <br />
      </div>
    `;
  });

  html += `
    <h1>Total: $${totalCost}</h1>
  `;

  return html;
}
