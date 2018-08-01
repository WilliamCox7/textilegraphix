import { React, Component, moment } from '../packages';

class OrderHtml extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: props.form,
      products: props.products
    }
  }

  render() {

    let form = this.state.form;
    console.log(form);
    let products = this.state.products;
    console.log(products);
    let orderDate = moment().format("MM/DD/YY");
    let delivery = moment().add(14, "days").format("MM/DD/YY");
    let logo = `${process.env.HOST}/src/logo.svg`;

    return (
      <html xmlns="http://www.w3.org/1999/xhtml">
        {/* <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
          <meta name="format-detection" content="telephone=no">
          <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">
          <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
          <title>Page title</title>
          <style type="text/css">
              @media screen and (max-width: 630px) {

              }
          </style>
        </head>

        <body style="padding:0; margin:0">

        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
            <tr>
                <td align="center" valign="top">

                </td>
            </tr>
        </table>

        </body> */}
      </html>
    );
  }
}

export default OrderHtml;

const css = {
  wrapper: {
    background: '#44B1DE',
    padding: '40px',
    height: '100%'
  },
  container: {
    maxWidth: '900px',
    margin: 'auto',
  },
  leftHeader: {
    textAlign: 'right',
    color: 'white',
    fontSize: '18px',
    marginBottom: '4px'
  },
  logoContainer: {
    display: 'flex',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    marginBottom: '70px'
  },
  logo: {
    width: '350px'
  },
  contentContainer: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
    padding: '25px'
  },
  thankyou: {
    fontSize: '20px',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  orderNumber: {
    color: '#44B1DE',
    fontSize: '18px',
    marginBottom: '14px',
    textAlign: 'center'
  },
  contentPara: {
    lineHeight: '26px',
    fontSize: '20px',
    color: '#363636',
    marginBottom: '40px'
  },
  deliverySection: {
    paddingBottom: '10px',
    borderBottom: 'solid 1px #363636'
  },
  deliveryHead: {
    fontSize: '20px',
    marginRight: '20px',
    fontWeight: 'bold'
  },
  deliveryDate: {
    fontSize: '20px',
    color: '#363636'
  }
}
