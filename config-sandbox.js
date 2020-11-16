// data personal to textilegraphix
const GRAPHIX = {

  production: {
    email: '',
    to: '',
    password: ''
  },

  development: {
    email: '',
    to: '',
    password: ''
  }

}

const ERROR = {
  email: '',
  to: '',
  password: ''
}

const AUTH_NET = {

  development: {
    apiLoginKey: '',
    transactionKey: ''
  },

  production: {
    apiLoginKey: '',
    transactionKey: ''
  }

}

const EASYPOST = {

  development: {
    key: ''
  },

  production: {
    key: ''
  }

}

const SSL = {

  development: {
    key: '',
    crt: ''
  },

  production: {
    key: '',
    crt: '',
    passphrase: ''
  }

}

const MYSQL = {

  development: {
    host: '',
    user: '',
    password: '',
    database: ''
  },

  production: {
    host: '',
    user: '',
    password: '',
    database: ''
  }

}

// this determines what environment the server is running in
const ENV = "development";

const HOST = "https://localhost:3001";

module.exports = {
  graphix: GRAPHIX[ENV],
  error: ERROR,
  auth_net: AUTH_NET[ENV],
  easypost: EASYPOST[ENV],
  mysql: MYSQL[ENV],
  ssl: SSL[ENV],
  env: ENV,
  host: HOST
}
