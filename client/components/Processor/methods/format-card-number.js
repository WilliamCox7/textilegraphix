export default function formatCardNumber(number, last) {
  number = removeWhiteSpace(number.split(''));
  last = removeWhiteSpace(last.split(''));
  let threshold = number.length === last.length ? number.length : 16;
  let formatted = [];
  number.forEach((char, i) => {
    if (i+1 <= threshold) formatted.push(char);
    if ((i+1) % 4 === 0 && i+1 < threshold) {
      formatted.push(' ');
      formatted.push(' ');
    }
  });
  return formatted.join('');
}

function removeWhiteSpace(number) {
  let upd = [];
  number.forEach((char) => {
    if (!isWhiteSpace(char) && !isNaN(char)) {
      upd.push(char);
    }
  });
  return upd;
}

function isWhiteSpace(char) {
  return ' \t\n\r\v'.indexOf(char) > -1
}
