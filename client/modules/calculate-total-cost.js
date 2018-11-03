export default function calculateTotalCost(args) {

  let order = args.order;
  let shippingOffset = args.shippingOffset;
  let costOverride = args.costOverride;

  // variable declaration
  let costOfShirt = costOverride === undefined ? order.product.costOfShirt : costOverride;
  let numShirts = order.quantity || 1;
  let numLocations = 0;
  let curLoc = 1;
  let shippingRate = shippingOffset;
  let markup = 1.5;
  let setCost = 0, setCostOne, setCostTwo, setCostThree, setCostFour; //, setCostFive;
  let numColors = {One: 0, Two: 0, Three: 0}; //, Four: 0, Five: 0};

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
    if (numColors.One == 1) setCostOne = setCostX([22.0, 6.0, 4.5, 2.5, 1.8, 1.6, 1.35, 1.15, .95, .85, .75], numShirts);
    else if (numColors.One == 2) setCostOne = setCostX([22.0, 7.0, 5.5, 3.0, 2.25, 1.95, 1.55, 1.3, 1.05, .95, .85], numShirts);
    else if (numColors.One == 3) setCostOne = setCostX([22.0, 8.0, 6.5, 3.5, 2.7, 2.3, 1.75, 1.45, 1.15, 1.05, .95], numShirts);
    else if (numColors.One == 4) setCostOne = setCostX([22.0, 9.0, 7.5, 4.0, 3.15, 2.65, 1.95, 1.6, 1.25, 1.15, 1.05], numShirts);
    else if (numColors.One == 5) setCostOne = setCostX([22.0, 10.0, 8.5, 4.5, 3.6, 3.0, 2.15, 1.75, 1.35, 1.25, 1.15], numShirts);
    else if (numColors.One == 6) setCostOne = setCostX([22.0, 11.0, 9.5, 5.0, 4.05, 3.35, 2.35, 1.9, 1.45, 1.35, 1.25], numShirts);
  }

  if (numLocations >= 2) {
    if (numColors.Two == 1) setCostTwo = setCostX([6.0, 3.2, 1.6, 1.25, .9, .8, .75, .6, .55, .5, .45], numShirts);
    else if (numColors.Two == 2) setCostTwo = setCostX([6.0, 3.8, 1.9, 1.5, 1.15, 1.0, .85, .65, .6, .55, .5], numShirts);
    else if (numColors.Two == 3) setCostTwo = setCostX([6.0, 4.4, 2.2, 1.75, 1.4, 1.2, .95, .7, .65, .6, .55], numShirts);
    else if (numColors.Two == 4) setCostTwo = setCostX([6.0, 5.0, 2.5, 2.0, 1.65, 1.4, 1.05, .75, .7, .65, .6], numShirts);
    else if (numColors.Two == 5) setCostTwo = setCostX([6.0, 5.6, 2.8, 2.25, 1.90, 1.6, 1.15, .8, .75, .7, .65], numShirts);
    else if (numColors.Two == 6) setCostTwo = setCostX([6.0, 6.2, 3.1, 2.5, 2.15, 1.8, 1.25, .85, .8, .75, .7], numShirts);
  }

  if (numLocations >= 3) {
    if (numColors.Three == 1) setCostThree = setCostX([6.0, 3.2, 1.6, 1.25, .9, .8, .75, .6, .55, .5, .45], numShirts);
    else if (numColors.Three == 2) setCostThree = setCostX([6.0, 3.8, 1.9, 1.5, 1.15, 1.0, .85, .65, .6, .55, .5], numShirts);
    else if (numColors.Three == 3) setCostThree = setCostX([6.0, 4.4, 2.2, 1.75, 1.4, 1.2, .95, .7, .65, .6, .55], numShirts);
    else if (numColors.Three == 4) setCostThree = setCostX([6.0, 5.0, 2.5, 2.0, 1.65, 1.4, 1.05, .75, .7, .65, .6], numShirts);
    else if (numColors.Three == 5) setCostThree = setCostX([6.0, 5.6, 2.8, 2.25, 1.90, 1.6, 1.15, .8, .75, .7, .65], numShirts);
    else if (numColors.Three == 6) setCostThree = setCostX([6.0, 6.2, 3.1, 2.5, 2.15, 1.8, 1.25, .85, .8, .75, .7], numShirts);
  }

  if (numLocations >= 4) {
    if (numColors.Four == 1) setCostFour = setCostX([6.0, 3.2, 1.6, 1.25, .9, .8, .75, .6, .55, .5, .45], numShirts);
    else if (numColors.Four == 2) setCostFour = setCostX([6.0, 3.8, 1.9, 1.5, 1.15, 1.0, .85, .65, .6, .55, .5], numShirts);
    else if (numColors.Four == 3) setCostFour = setCostX([6.0, 4.4, 2.2, 1.75, 1.4, 1.2, .95, .7, .65, .6, .55], numShirts);
    else if (numColors.Four == 4) setCostFour = setCostX([6.0, 5.0, 2.5, 2.0, 1.65, 1.4, 1.05, .75, .7, .65, .6], numShirts);
    else if (numColors.Four == 5) setCostFour = setCostX([6.0, 5.6, 2.8, 2.25, 1.90, 1.6, 1.15, .8, .75, .7, .65], numShirts);
    else if (numColors.Four == 6) setCostFour = setCostX([6.0, 6.2, 3.1, 2.5, 2.15, 1.8, 1.25, .85, .8, .75, .7], numShirts);
  }

  if (numLocations == 1) setCost = setCostOne;
  else if (numLocations == 2) setCost = setCostOne + setCostTwo;
  else if (numLocations == 3) setCost = setCostOne + setCostTwo + setCostThree;
  else if (numLocations == 4) setCost = setCostOne + setCostTwo + setCostThree + setCostFour;
  // else if (numLocations == 5) setCost = setCostOne + setCostTwo + setCostThree + setCostFour + setCostFive;

  // calculate add ons
  if (order.foldedAndBagged) costOfShirt += .4;
  if (order.insideTagPrinting) costOfShirt += 1.15;
  if (order.hemTags) costOfShirt += 2.25;

  let sizeOffsets = {
    XL2: 2.50,
    XL3: 3.50,
    XL4: 4.00,
    XL5: 5.00
  }

  // calculate results and return
  let numShirtsXL = 0, XL2Cost = 0, XL3Cost = 0, XL4Cost = 0, XL5Cost = 0;
  if (order.XL2) {
    numShirtsXL += order.XL2;
    XL2Cost = parseFloat(costOfShirt + setCost + markup + sizeOffsets.XL2) * (order.XL2);
  }
  if (order.XL3) {
    numShirtsXL += order.XL3;
    XL3Cost = parseFloat(costOfShirt + setCost + markup + sizeOffsets.XL3) * (order.XL3);
  }
  if (order.XL4) {
    numShirtsXL += order.XL4;
    XL4Cost = parseFloat(costOfShirt + setCost + markup + sizeOffsets.XL4) * (order.XL4);
  }
  if (order.XL5) {
    numShirtsXL += order.XL5;
    XL5Cost = parseFloat(costOfShirt + setCost + markup + sizeOffsets.XL5) * (order.XL5);
  }
  let regCost = parseFloat(costOfShirt + setCost + markup) * (numShirts - numShirtsXL);
  let shippingCost = parseFloat(shippingRate) * numShirts;

  return {
    totalCost: (regCost + XL2Cost + XL3Cost + XL4Cost + XL5Cost + shippingCost).toFixed(2),
    costPerShirt: (parseFloat(costOfShirt + setCost + markup + shippingRate)).toFixed(2),
    totalShipping: shippingCost,
    sizeOffsets: sizeOffsets
  }
}

function setCostX(arr, numShirts) {
  if (numShirts >= 1 && numShirts <= 9) return arr[0];
  else if (numShirts >= 10 && numShirts <= 19) return arr[1];
  else if (numShirts >= 20 && numShirts <= 29) return arr[2];
  else if (numShirts >= 30 && numShirts <= 49) return arr[3];
  else if (numShirts >= 50 && numShirts <= 99) return arr[4];
  else if (numShirts >= 100 && numShirts <= 149) return arr[5];
  else if (numShirts >= 150 && numShirts <= 299) return arr[6];
  else if (numShirts >= 300 && numShirts <= 499) return arr[7];
  else if (numShirts >= 500 && numShirts <= 999) return arr[8];
  else if (numShirts >= 1000 && numShirts <= 2500) return arr[9];
  else return arr[10];
}

function setNumColors(loc, num, numColors) {
  switch(loc) {
    case 1: numColors.One = num; break;
    case 2: numColors.Two = num; break;
    case 3: numColors.Three = num; break;
    case 4: numColors.Four = num; break;
    // case 5: numColors.Five = num; break;
  }
  return numColors;
}
