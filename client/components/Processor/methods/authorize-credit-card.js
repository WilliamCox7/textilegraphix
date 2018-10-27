import axios from 'axios';

export default function authorizeCreditCard() {
  this.props.toggle('waiting');
  let creditCard = Object.assign({}, this.state);
  let form = Object.assign({}, this.props);
  let authObj = buildAuthObject(creditCard, form);
  axios.post('/authorize', authObj).then((response) => {
    // response.data.messages.resultCode [ "Ok" | "Error" ]
    // response.data.messages.message.text
    console.log(response);
    this.sendConfirmation(this.props.cart.form, this.props.cart.orders);
    this.props.toggle('waiting', 'paymentModal');
    this.props.clearCart();
    this.props.history.push('/cart');
  });
}

function buildAuthObject(creditCard, form) {
  creditCard.exp = get2DigitMonthCode(creditCard.expMonth) + creditCard.expYear.substring(2);
  creditCard.number = removeWhiteSpace(creditCard.number);
  form.tax = (form.exempt ? 0 : form.total * 0.06).toFixed(4);
  form.total = form.total.toFixed(4);
  form.shippingAmount = (0).toFixed(4);
  return Object.assign({}, form, creditCard);
}

function get2DigitMonthCode(month) {
  switch(month.toLowerCase()) {
    case 'january': return '01'; break;
    case 'february': return '02'; break;
    case 'march': return '03'; break;
    case 'april': return '04'; break;
    case 'may': return '05'; break;
    case 'june': return '06'; break;
    case 'july': return '07'; break;
    case 'august': return '08'; break;
    case 'september': return '09'; break;
    case 'october': return '10'; break;
    case 'november': return '11'; break;
    case 'december': return '12'; break;
  }
}

function removeWhiteSpace(number) {
  number = number.split("");
  let upd = [];
  number.forEach((char) => {
    if (!isWhiteSpace(char) && !isNaN(char)) {
      upd.push(char);
    }
  });
  return upd.join("");
}

function isWhiteSpace(char) {
  return ' \t\n\r\v'.indexOf(char) > -1
}
