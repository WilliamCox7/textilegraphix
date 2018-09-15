export default function buildCardSubHeader(order) {
  let amount = determineAmount(order);
  let locationText = `${amount} ${pluralize(amount, 'Location')}`;
  let dashText = amount ? ' - ' : '';
  let locationList = [];
  let colorText = '';
  if (order.frontColors) locationList.push(buildColorText(order.frontColors, 'Front'));
  if (order.backColors) locationList.push(buildColorText(order.backColors, 'Back'));
  if (order.leftSleeveColors) locationList.push(buildColorText(order.leftSleeveColors, 'Left Sleeve'));
  if (order.rightSleeveColors) locationList.push(buildColorText(order.rightSleeveColors, 'Right Sleeve'));
  if (locationList.length) colorText = locationList.join(', ');
  return locationText + dashText + colorText;
}

function determineAmount(order) {
  let amount = 0;
  if (order.frontColors) amount++;
  if (order.backColors) amount++;
  if (order.leftSleeveColors) amount++;
  if (order.rightSleeveColors) amount++;
  return amount;
}

function pluralize(amount, word) {
  if (amount > 1 || amount === 0) {
    return word + 's';
  } else {
    return word;
  }
}

function buildColorText(color, type) {
  return `${color} ${pluralize(color, 'Color')} ${type}`;
}
