const fs = require('fs')
const axios = require('axios')
const AxiosHelper = require('./helpers/axios')
// const UserTest = require('./controllers/test-users')
// const LogistTest = require('./controllers/test-logists')
// const PermissionTest = require('./controllers/test-permissions')

require('../src')

axios.defaults.baseURL = 'http://localhost:3333/'

// const controllers_dirs = fs.readdirSync('./src/controllers')
// console.log(controllers_dirs)

// for (const i in controllers_dirs) {
// 	const dir = controllers_dirs[i]
// 	const files = fs.readdirSync('./src/controllers/' + dir)
// 	console.log(files)
// }

const login = async (data) => {
	const result = await AxiosHelper.login('users', {
		mail: 'admin@orcap.com.br',
		password: '123456',
	})
	return result
}

const listAll = async (model) => {
	const url = '/' + model
	console.log(url)
	await axios.get(url).then(
		async (response) => {
			if (response.data && response.data.data) {
				await getById(model, response.data.data[0].id)
			} else {
				console.log(response.data)
			}
		},
		async (error) => {
			console.log(error.response.data)
		}
	)
}

const getById = async (model, id) => {
	const url = '/' + model + '/' + id
	console.log(url)
	await axios.get(url).then(
		async (response) => {
			console.log(response.data)
			await insertData(model, response.data)
		},
		async (error) => {
			console.log(error.response.data)
		}
	)
}

const insertData = async (model, data) => {
	const url = '/' + model
	console.log(url)
	await axios.post(url, data).then(
		async (response) => {
			console.log(response.data)
		},
		async (error) => {
			console.log(error.response.data)
		}
	)
}

const updateData = async (model, id, data) => {
	const url = '/' + model + '/' + id
	console.log(url)
	await axios.put(url, data).then(
		async (response) => {
			console.log(response.data)
		},
		async (error) => {
			console.log(error.response.data)
		}
	)
}

const deleteData = async (model, id) => {
	const url = '/' + model + '/' + id
	console.log(url)
	await axios.put(url, data).then(
		async (response) => {
			console.log(response.data)
		},
		async (error) => {
			console.log(error.response.data)
		}
	)
}

const restoreData = async (model, id) => {
	const url = '/' + model + '/' + id
	console.log(url)
	await axios.put(url, data).then(
		async (response) => {
			console.log(response.data)
		},
		async (error) => {
			console.log(error.response.data)
		}
	)
}

const start = async (params) => {
	const dirs = fs.readdirSync('./src/controllers')
	await login()
	for (const i in dirs) {
		const dir = dirs[i]
		const files = fs.readdirSync('./src/controllers/' + dir)
		for (const j in files) {
			const model = files[j].split('.')[0]
			const remove = ['equipments', 'permissions', 'sessions']
			if (remove.indexOf(model) === -1 && (params == '' || params == model)) {
				console.log(
					'\n---------------------- ' + model + ' ----------------------'
				)
				await listAll(model)
			}
		}
	}
	process.exit()
}

const params = JSON.parse(process.env.npm_config_argv).original[2]
start(params)
// const start = async () => {
// 	await LogistTest.start()
// 	process.exit()
// }

// const start = () => {
// 	LogistTest.start()
// 	process.exit()
// }

// start()

// conta = () => {
// 	console.log('CONTA')
// 	let v1 = 0

// 	v1 = add(0, (valor) => {
// 		console.log('CONTA: ' + valor)
// 		process.exit()
// 	})

// 	console.log('FINAL')
// }

// add = (v, callback) => {
// 	setTimeout(() => {
// 		console.log('ADD')
// 		for (let i = 0; i < 10000000; i++) {
// 			v = v + 1
// 		}
// 		console.log('SOMOU TUDO: ' + v)
// 		callback(v)
// 	}, 1000)
// }

// conta()
