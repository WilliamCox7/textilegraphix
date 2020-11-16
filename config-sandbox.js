// data personal to textilegraphix
const GRAPHIX = {

  production: {
    email: 'willcx30@gmail.com',
    to: 'willcx30@gmail.com',
    password: ''
  },

  development: {
    email: 'willcx30@gmail.com',
    to: 'willcx30@gmail.com',
    password: ''
  }

}

const ERROR = {
  email: 'willcx30@gmail.com',
  to: 'willcx30@gmail.com',
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
    key: '/Users/williamcox/.ssh/key.pem',
    crt: '/Users/williamcox/.ssh/certificate.pem'
  },

  production: {
    key: '/etc/nginx/ssl/textilegraphix_com/textilegraphix_com.key',
    crt: '/etc/nginx/ssl/textilegraphix_com/ssl-bundle.crt',
    passphrase: 'Dell1992'
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
  env: ENV,
  host: HOST
}
