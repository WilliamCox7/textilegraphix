const API_URL = 'https://www.ssactivewear.com/';

export default function mapProducts(products) {
  let map = {};
  products.forEach((product) => {
    if (product.colorFrontImage && product.colorBackImage) {
      let parentSku = getParentSku(product.sku);
      if (map.hasOwnProperty(parentSku)) {
        if (!map[parentSku].images.hasOwnProperty(product.color1)) {
          map[parentSku].images[product.color1] = [
            API_URL + product.colorFrontImage,
            API_URL + product.colorBackImage
          ];
          map[parentSku].colors.push({
            hex: product.color1,
            name: product.colorName
          });
        }
      } else {
        let prodObj = buildProductObj(product);
        map[parentSku] = prodObj;
      }
    }
  });
  return convertToArray(map);
}

function getParentSku(sku) {
  return sku.substring(1, 6);
}

function buildProductObj(product) {
  return {
    thumbnail: API_URL + product.colorFrontImage,
    images: {
      [product.color1]: [
        API_URL + product.colorFrontImage,
        API_URL + product.colorBackImage
      ]
    },
    brand: product.brandName,
    number: product.styleName,
    costOfShirt: product.salePrice,
    description: "",
    type: getType(product.styleID),
    colors: [{
      hex: product.color1,
      name: product.colorName
    }],
    ranking: 1,
    sizes: product.sizePriceCodeName
  };
}

function getType(styleID) {
  switch(styleID) {
    case 21: return "t-shirts"; break;
    case 36: return "hoodies"; break;
    case 56: return "long sleeve shirt"; break;
    case 20: return "sweaters"; break;
  }
}

function convertToArray(map) {
  let arr = [];
  for (var prop in map) {
    arr.push(map[prop]);
  }
  return arr;
}
