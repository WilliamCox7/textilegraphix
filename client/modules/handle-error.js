import axios from 'axios';

export default function handleError(err, id, send) {
  
  let details = {
    message: getErrorMessage(id),
    errorId: id,
    error: err
  };

  console.error(details);

  if (send) return axios.post('/error', details);
  else return Promise.resolve();
}

function getErrorMessage(id) {

  switch(id) {
    case 'F-001': return '[add-to-cart] There was an error while generating a data url with html2canvas';
    case 'F-002': return '[get-rates] There was an error with the shipping api';
    case 'F-003': return '[update-to-cart] There was an error while generating a data url with html2canvas';
    case 'F-004': return '[send-confirmation] There was an error while getting the next order number';
    case 'F-005': return '[send-confirmation] There was an error while creating an order';
    case 'F-006': return '[authorize-credit-card] There was an error while authorizing a card';
    case 'F-007': return '[Products] There was an error while getting all products';
    default: return 'An unknown error has occured';
  }

}