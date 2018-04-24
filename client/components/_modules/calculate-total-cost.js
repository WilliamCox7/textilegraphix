export default function calculateTotalCost(order) {

  // variable declaration
  let costOfShirt = order.product.costOfShirt;
  let numShirts = order.quantity;
  let numLocations = 0;
  let curLoc = 1;
  let shippingRate = .3;
  let markup = 1.5;
  let setCost = 0, setCostOne, setCostTwo, setCostThree, setCostFour;
  let numColors = {One: 0, Two: 0, Three: 0, Four: 0};

  // initialize from order
  if (order.frontColors > 0) { setNumColors(curLoc, order.frontColors, numColors); numLocations++; curLoc++; }
  if (order.backColors > 0) { setNumColors(curLoc, order.backColors, numColors); numLocations++; curLoc++; }
  if (order.leftSleeveColors > 0) { setNumColors(curLoc, order.leftSleeveColors, numColors); numLocations++; curLoc++; }
  if (order.rightSleeveColors > 0) { setNumColors(curLoc, order.rightSleeveColors, numColors); numLocations++; curLoc++; }

  // determine markup
  if (costOfShirt < 0.01) markup = 0;
  else if (numShirts <= 100) markup = 1.5;
  else if (numShirts >= 101 && numShirts <= 250) markup = 1.25;
  else if (numShirts >= 251 && numShirts <= 500) markup = 1;
  else if (numShirts >= 501 && numShirts <= 1000) markup = .75;
  else if (numShirts >= 1001) markup = .50;

  // accumulate the set cost
  if (numLocations >= 1) {
    if (numColors.One == 1) setCostOne = setCostX([3.2, 2.5, 1.8, 1.6, 1.35, 1.15, .95], numShirts);
    else if (numColors.One == 2) setCostOne = setCostX([3.75, 3.0, 2.25, 1.95, 1.55, 1.30, 1.05], numShirts);
    else if (numColors.One == 3) setCostOne = setCostX([4.3, 3.5, 2.7, 2.3, 1.75, 1.45, 1.15], numShirts);
    else if (numColors.One == 4) setCostOne = setCostX([4.85, 4.0, 3.15, 2.65, 1.95, 1.60, 1.25], numShirts);
  }

  if (numLocations >= 2) {
    if (numColors.Two == 1) setCostTwo = setCostX([1.6, 1.25, .9, .8, .75, .6, .55], numShirts);
    else if (numColors.Two == 2) setCostTwo = setCostX([1.9, 1.5, 1.15, 1.00, .8, .65, .6], numShirts);
    else if (numColors.Two == 3) setCostTwo = setCostX([2.15, 1.75, 1.4, 1.15, .9, .75, .7], numShirts);
    else if (numColors.Two == 4) setCostTwo = setCostX([2.4, 2.0, 1.65, 1.35, 1.0, .8, .75], numShirts);
  }

  if (numLocations >= 3) {
    if (numColors.Three == 1) setCostThree = setCostX([1.6, 1.25, .9, .8, .75, .6, .55], numShirts);
    else if (numColors.Three == 2) setCostThree = setCostX([1.9, 1.5, 1.15, 1.00, .8, .65, .6], numShirts);
    else if (numColors.Three == 3) setCostThree = setCostX([2.15, 1.75, 1.4, 1.15, .9, .75, .7], numShirts);
    else if (numColors.Three == 4) setCostThree = setCostX([2.4, 2.0, 1.65, 1.35, 1.0, .8, .75], numShirts);
  }

  if (numLocations >= 4) {
    if (numColors.Four == 1) setCostFour = setCostX([1.6, 1.25, .9, .8, .75, .6, .55], numShirts);
    else if (numColors.Four == 2) setCostFour = setCostX([1.9, 1.5, 1.15, 1.00, .8, .65, .6], numShirts);
    else if (numColors.Four == 3) setCostFour = setCostX([2.15, 1.75, 1.4, 1.15, .9, .75, .7], numShirts);
    else if (numColors.Four == 4) setCostFour = setCostX([2.4, 2.0, 1.65, 1.35, 1.0, .8, .75], numShirts);
  }

  if (numLocations == 1) setCost = setCostOne;
  else if (numLocations == 2) setCost = setCostOne + setCostTwo;
  else if (numLocations == 3) setCost = setCostOne + setCostTwo + setCostThree;
  else if (numLocations == 4) setCost = setCostOne + setCostTwo + setCostThree + setCostFour;

  // calculate add ons
  if (order.foldedAndBagged) costOfShirt += .4;
  if (order.insideTagPrinting) costOfShirt += 1.15;
  if (order.hemTags) costOfShirt += 2.25;

  // calculate results and return
  let numShirtsXL = 0, XL2Cost = 0, XL3Cost = 0, XL4Cost = 0;
  if (order.XL2) {
    numShirtsXL += order.XL2;
    XL2Cost = parseFloat(costOfShirt + setCost + markup + 1.75) * (order.XL2);
  }
  if (order.XL3) {
    numShirtsXL += order.XL3;
    XL3Cost = parseFloat(costOfShirt + setCost + markup + 3.00) * (order.XL3);
  }
  if (order.XL4) {
    numShirtsXL += order.XL4;
    XL4Cost = parseFloat(costOfShirt + setCost + markup + 3.50) * (order.XL4);
  }
  let regCost = parseFloat(costOfShirt + setCost + markup) * (numShirts - numShirtsXL);
  let shippingCost = parseFloat(shippingRate) * numShirts;
  
  return {
    totalCost: (regCost + XL2Cost + XL3Cost + XL4Cost + shippingCost).toFixed(2),
    costPerShirt: (parseFloat(costOfShirt + setCost + markup + shippingRate)).toFixed(2),
    totalShipping: shippingCost
  }
}

function setCostX(arr, numShirts) {
  if (numShirts <= 29) return arr[0];
  else if (numShirts >= 30 && numShirts <= 49) return arr[1];
  else if (numShirts >= 50 && numShirts <= 89) return arr[2];
  else if (numShirts >= 90 && numShirts <= 143) return arr[3];
  else if (numShirts >= 144 && numShirts <= 287) return arr[4];
  else if (numShirts >= 288 && numShirts <= 499) return arr[5];
  else if (numShirts >= 500) return arr[6];
}

function setNumColors(loc, num, numColors) {
  switch(loc) {
    case 1: numColors.One = num; break;
    case 2: numColors.Two = num; break;
    case 3: numColors.Three = num; break;
    case 4: numColors.Four = num; break;
    case 5: numColors.Five = num; break;
  }
  return numColors;
}
