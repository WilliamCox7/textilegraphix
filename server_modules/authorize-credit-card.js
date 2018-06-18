const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const config = require('../config.js');

module.exports = function authorizeCreditCard(request) {
  return new Promise((resolve, reject) => {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(config.auth_net.apiLoginKey);
    merchantAuthenticationType.setTransactionKey(config.auth_net.transactionKey);

    var creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(request.number); // '4242424242424242'
    creditCard.setExpirationDate(request.exp); // '0822'
    creditCard.setCardCode(request.ccv); // '999'

    var paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    var orderDetails = new ApiContracts.OrderType();
  	orderDetails.setInvoiceNumber(request.contact.projectName); // 'INV-12345'

    var tax = new ApiContracts.ExtendedAmountType();
    tax.setAmount(request.tax); // '4.26'

    var shipping = new ApiContracts.ExtendedAmountType();
    shipping.setAmount(request.shippingAmount); // '8.55'

    var billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(request.billing.first); // 'Ellen'
    billTo.setLastName(request.billing.last); // 'Johnson'
    billTo.setCompany(request.contact.company); // 'Souveniropolis'
    billTo.setAddress(request.billing.address); // '14 Main Street'
    billTo.setCity(request.billing.city); // 'Pecan Springs'
    billTo.setState(request.billing.state); // 'TX'
    billTo.setZip(request.billing.zip); // '44628'
    billTo.setCountry('USA'); // 'USA'

    var shipTo = new ApiContracts.CustomerAddressType();
    shipTo.setFirstName(request.shipping.first); // 'China'
    shipTo.setLastName(request.shipping.last); // 'Bayles'
    shipTo.setCompany(request.contact.company); // 'Thyme for Tea'
    shipTo.setAddress(request.shipping.address); // '12 Main Street'
    shipTo.setCity(request.shipping.city); // 'Pecan Springs'
    shipTo.setState(request.shipping.state); // 'TX'
    shipTo.setZip(request.shipping.zip); // '44628'
    shipTo.setCountry('USA'); // 'USA'

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(request.total);
	   transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setTax(tax);
    transactionRequestType.setTaxExempt(request.exempt);
    transactionRequestType.setShipping(shipping);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setShipTo(shipTo);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

    ctrl.execute(function() {

      var apiResponse = ctrl.getResponse();

      var response = new ApiContracts.CreateTransactionResponse(apiResponse);

      //pretty print response
      console.log(JSON.stringify(response, null, 2));

      if(response != null){
        if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
          if(response.getTransactionResponse().getMessages() != null){
            console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
            console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
            console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
            console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
          }
          else {
            console.log('Failed Transaction.');
            if(response.getTransactionResponse().getErrors() != null){
              console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
              console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
            }
          }
        }
        else {
          console.log('Failed Transaction.');
          if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){

            console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
            console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
          }
          else {
            console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
            console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
          }
        }
      }
      else {
        console.log('Null Response.');
      }

      resolve(response);
    });
  });
}
