// this app's port for development
const PORT = 3000;

// this app's server location
const HOST = {
  production: "",
  development: "http://localhost:" + PORT
}

// data personal to textilegraphix
const GRAPHIX = {

  production: {
    email: 'textilegraphix@gmail.com',
    to: 'design@textilegraphix.com',
    password: 'xxx'
  },

  development: {
    email: 'willubyu7@gmail.com',
    to: 'willubyu7@gmail.com',
    password: 'Kmalone32'
  }

}

// this determines what environment the server is running in
const ENV = "development";

module.exports = {
  api: HOST[ENV],
  port: PORT,
  graphix: GRAPHIX[ENV]
}
