const axios = require('axios')
const chalk = require('chalk')
const Server = require('../../src/helpers/server')
const Data = require('../data/data-users')

module.exports = {
	async start() {
		await this.testPermissionAdmin()
		await this.testPermissionManager()
		await this.testPermissionEmployee()
	},

	async testPermissionAdmin() {
		await this.testPermission({
			mail: 'admin@orcap.com.br',
			password: '123456',
		})
	},

	async testPermissionManager() {
		await this.testPermission({
			mail: 'gerente@orcap.com.br',
			password: '123456',
		})
	},

	async testPermissionEmployee() {
		await this.testPermission({
			mail: 'funcionario@orcap.com.br',
			password: '123456',
		})
	},

	async testPermission(data) {
		const result = await this.login(data)
		await this.userCreate(result)
		for (const i in Data) {
			console.log(
				chalk.blue('\n-- Permissão ' + result.type + ' / ' + Data[i].type + '')
			)
			await this.userChange(Data[i])
		}
	},

	async login(data) {
		console.log(chalk.blue('\n-- Logar com Usuário ( ' + data.mail + ' )'))
		let result = {}
		await axios
			.get('/login/user?mail=' + data.mail + '&password=' + data.password)
			.then(
				(response) => {
					axios.defaults.headers.common['Authorization'] =
						'Bearer ' + response.data.token
					console.log(data.password)
					console.log(chalk.green('Logado: ' + response.data.token))
					result = response.data
				},
				(error) => {
					console.log(chalk.red(error.data.error.parent.detail))
					result = { status: error.data.error.parent.detail }
				}
			)
		return result
	},

	async userCreate(data) {
		for (const i in Data) {
			console.log(
				chalk.blue(
					'\n-- Adicionar Usuário ( ' + data.type + ' / ' + Data[i].mail + ' )'
				)
			)
			await axios.post('/users', Data[i]).then(
				(response) => {
					if (response && response.data && !response.data.error) {
						console.log(chalk.green(response.data.status))
					} else {
						console.log(chalk.red(response.data.status))
						console.log(chalk.redBright(response.data.error))
						console.log(chalk.red(response.data.error))
					}
				},
				(error) => {
					console.log(chalk.red(error))
				}
			)
		}
	},

	async userChange(data) {
		console.log(chalk.blackBright('---- Alterar Usuário ( ' + data.mail + ' )'))
		data.name = data.name + ' 1'
		await axios.put('/users', data).then(
			(response) => {
				if (response && response.data && !response.data.error) {
					console.log(chalk.green(response.data.status))
				} else {
					console.log(chalk.red(response.data.status))
					console.log(chalk.redBright(response.data.error))
				}
			},
			(error) => {
				console.log(chalk.red(error.data.error))
			}
		)
	},
}
