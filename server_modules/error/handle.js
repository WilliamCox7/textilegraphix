module.exports = function handle(err, id) {

  let details = {
    message: getErrorMessage(id),
    errorId: id,
    error: err
  };

  console.error(JSON.stringify(details, 'utf8', 2));

  return Promise.reject(details);
}

function getErrorMessage(id) {

  switch(id) {
    case 'B-001': return 'There was an error while sending an error email';
    case 'B-002': return 'There was an error while creating a shipment';
    case 'B-003': return 'There was an error while getting the next order number';
    case 'B-004': return 'There was an error while getting an order by guid';
    case 'B-005': return 'There was an error while getting all order items for an order';
    case 'B-006': return 'There was an error while getting an order items info';
    case 'B-007': return 'There was an error while inserting into orders';
    case 'B-008': return 'There was an error while inserting into addresses';
    case 'B-009': return 'There was an error while inserting into addresses';
    case 'B-010': return 'There was an error while inserting into contacts';
    case 'B-011': return 'There was an error while inserting into orderItems';
    case 'B-012': return 'There was an error while inserting into sizes';
    case 'B-013': return 'There was an error while inserting into mockups';
    case 'B-014': return 'There was an error while getting mockups';
    case 'B-015': return 'There was an error while getting sizes';
    case 'B-016': return 'There was an error while sending an order email';
    case 'B-017': return 'There was an error while sending a receipt email';
    case 'B-018': return 'There was an error while getting a products colors';
    case 'B-019': return 'There was an error while getting a products images';
    case 'B-020': return 'There was an error while getting a products print area';
    case 'B-021': return 'There was an error while getting all products';
    case 'B-022': return 'There was an error while creating an image from buffer';
    default: return 'An unknown message occured';
  }

}