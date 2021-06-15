const chalk = require('chalk')
const AxiosHelper = require('../helpers/axios')
const Data = require('../data/data-logists')

module.exports = {
	async start() {
		await this.testPermissionAdmin()
		await this.testPermissionLogist()
	},

	async testPermissionAdmin() {
		const data = {
			mail: 'admin@orcap.com.br',
			password: '123456',
		}
		const result = await AxiosHelper.login('user', data)
		await this.testPermission(result, data)
	},

	async testPermissionLogist() {
		const data = {
			mail: 'contato@logista.com.br',
			password: '123456',
		}
		const result = await AxiosHelper.login('logist', data)
		await this.testPermission(result, data)
	},

	async testPermission(result, data) {
		if (result && result.token) {
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
		} else {
			console.log(chalk.red(result.status))
		}
	},

	async userCreate(data) {
		for (const i in Data) {
			console.log(
				chalk.blue(
					'\n-- Adicionar Logista ( ' + data.type + ' / ' + Data[i].mail + ' )'
				)
			)
			await AxiosHelper.exec('post', '/logists', Data[i])
		}
	},

	async userGet() {
		await AxiosHelper.exec(
			'get',
			'/logists/3d7615ae-d514-48a0-b269-6e563984c6ba',
			{}
		)
	},

	async userList() {
		await AxiosHelper.exec('get', '/logists', {})
	},

	async userChange() {
		await AxiosHelper.exec(
			'put',
			'/logists/3d7615ae-d514-48a0-b269-6e563984c6ba',
			{}
		)
	},

	async userDelete() {
		await AxiosHelper.exec(
			'delete',
			'/logists/3d7615ae-d514-48a0-b269-6e563984c6ba',
			{}
		)
	},

	async userRestore() {
		await AxiosHelper.exec(
			'put',
			'/logists/3d7615ae-d514-48a0-b269-6e563984c6ba/restore',
			{}
		)
	},
}
