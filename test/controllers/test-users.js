const axios = require('axios')
const chalk = require('chalk')
const AxiosHelper = require('../helpers/axios')
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
				chalk.blue('\n-- Permissão Alterar ' + result.type + ' / ' + Data[i].type + '')
			)
			await this.userChange(Data[i])
		}
	},

	async login(data) {
		const result = await AxiosHelper.login(data)
		return result
	},

	async userCreate(data) {
		for (const i in Data) {
			console.log(
				chalk.blue(
					'\n-- Adicionar Usuário ( ' + data.type + ' / ' + Data[i].mail + ' )'
				)
			)
			await AxiosHelper.exec('post', '/users', Data[i])
		}
	},

	async userChange(data) {
		data.name = data.name + ' 1'
		await AxiosHelper.exec('put', '/users', data)
	},
}
