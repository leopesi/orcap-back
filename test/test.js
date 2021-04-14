const axios = require('axios')
const UserTest = require('./controllers/test-users')
const PermissionTest = require('./controllers/test-permissions')

require('../src')

axios.defaults.baseURL = 'http://localhost:3333/'



UserTest.start(() => {
	console.log('EXIT')
	process.exit()
})
