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
      <div style={css.wrapper}>
        <div style={css.container}>
          <div style={css.leftHeader}>Order #: {form.guid}</div>
          <div style={css.leftHeader}>Order Date: {orderDate}</div>
          <div style={css.logoContainer}>
            <img style={css.logo} src={logo} />
          </div>
          <div style={css.contentContainer}>
            <div style={css.thankyou}>Thank you for your order, {form.contact.first}!</div>
            <div style={css.orderNumber}>Order #: {form.guid}</div>
            <p style={css.contentPara}>
              Your order has been successfully placed. You’ll find all the details about your order
              below, and we’ll send you a shipping confirmation email as soon as your order ships!
              Thanks again!
            </p>
            <div style={css.deliverySection}>
              <span style={css.deliveryHead}>Estimated Delivery:</span>
              <span style={css.deliveryDate}>{delivery}</span>
            </div>
          </div>
        </div>
      </div>
    )
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
