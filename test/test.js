const axios = require('axios')
const UserTest = require('./controllers/test-users')
const LogistTest = require('./controllers/test-logists')
const PermissionTest = require('./controllers/test-permissions')

// require('../src')

axios.defaults.baseURL = 'http://localhost:3333/'

// const start = async () => {
// 	await LogistTest.start()
// 	process.exit()
// }

// const start = () => {
// 	LogistTest.start()
// 	process.exit()
// }

// start()

conta = () => {
	console.log('CONTA')
	let v1 = 0

	v1 = add(0, (valor) => {
		console.log('CONTA: ' + valor)
		process.exit()
	})

	console.log('FINAL')
}

add = (v, callback) => {
	setTimeout(() => {
		console.log('ADD')
		for (let i = 0; i < 10000000; i++) {
			v = v + 1
		}
		console.log('SOMOU TUDO: ' + v)
		callback(v)
	}, 1000)
}

conta()
