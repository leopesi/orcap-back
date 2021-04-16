const axios = require('axios')
const UserTest = require('./controllers/test-users')
const LogistTest = require('./controllers/test-logists')
const PermissionTest = require('./controllers/test-permissions')

require('../src')

axios.defaults.baseURL = 'http://localhost:3333/'

const start = async () => {
	await LogistTest.start()
	process.exit()
}

start()