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
		console.log(chalk.blue('\n-- Permissão Selecionar ' + data.mail))
		await this.userGet()
		console.log(chalk.blue('\n-- Permissão Listar ' + data.mail))
		await this.userList()
		console.log(chalk.blue('\n-- Permissão Alterar ' + data.mail))
		await this.userChange()
		console.log(chalk.blue('\n-- Permissão Desativar ' + data.mail))
		await this.userDelete()
		console.log(chalk.blue('\n-- Permissão Reativar ' + data.mail))
		await this.userRestore()
	},

	async login(data) {
		const result = await AxiosHelper.login('users', data)
		return result
	},

	async userCreate(data) {
		for (const i in Data) {
			console.log(
				chalk.blue(
					'\n-- Adicionar ' +
						table +
						' ( ' +
						data.type +
						' / ' +
						Data[i].mail +
						' )'
				)
			)
			await AxiosHelper.exec('post', '/users', Data[i])
		}
	},

	async userGet() {
		await AxiosHelper.exec(
			'get',
			'/users/98121754-4a25-4b02-addf-cf15374b2d8d',
			{}
		)
	},

	async userList() {
		await AxiosHelper.exec('get', '/users', {})
	},

	async userChange() {
		await AxiosHelper.exec(
			'put',
			'/users/98121754-4a25-4b02-addf-cf15374b2d8d',
			{}
		)
	},

	async userDelete() {
		await AxiosHelper.exec(
			'delete',
			'/users/98121754-4a25-4b02-addf-cf15374b2d8d',
			{}
		)
	},

	async userRestore() {
		await AxiosHelper.exec(
			'put',
			'/users/98121754-4a25-4b02-addf-cf15374b2d8d/restore',
			{}
		)
	},
}
