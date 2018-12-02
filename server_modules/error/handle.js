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
    default: return 'An unknown message occured';
  }

}