// data personal to textilegraphix
const GRAPHIX = {

  production: {
    email: 'textilegraphix@gmail.com',
    to: 'design@textilegraphix.com',
    password: 'Dell1992'
  },

  development: {
    email: 'willubyu7@gmail.com',
    to: 'willubyu7@gmail.com',
    password: 'DonMitch45'
  }

}

const ERROR = {

  email: 'willubyu7@gmail.com',
  to: 'willubyu7@gmail.com',
  password: 'DonMitch45'

}

// this determines what environment the server is running in
const ENV = "development";

module.exports = {
  graphix: GRAPHIX[ENV],
  error: ERROR
}
