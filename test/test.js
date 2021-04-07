const axios = require('axios')
const UserTest = require('./users')

require('../src')

axios.defaults.baseURL = 'http://localhost:3333/'

UserTest.start()
