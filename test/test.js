const axios = require('axios')
const UserTest = require('./controllers/test-users')

require('../src')

axios.defaults.baseURL = 'http://localhost:3333/'

UserTest.start()
