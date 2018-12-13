module.exports = function handle(err, id) {

  let details = {
    message: getErrorMessage(id),
    errorId: id,
    error: err
  };

  console.error(details);

  return details;
}

function getErrorMessage(id) {

  switch(id) {
    case 'IOP2': return 'There was an error while getting all products';
    case 'HGF5': return 'There was an error while getting a products colors';
    case 'SDF7': return 'There was an error while getting a products images';
    case 'KLI3': return 'There was an error while getting a products print area';
    case 'WPJ5': return 'There was an error while saving an order';
    case 'XZ9S': return 'There was an error while creating an image from buffer';
    default: return 'An unknown message occured';
  }

}