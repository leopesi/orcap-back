const axios = require('axios')
const chalk = require('chalk')

module.exports = {

	async exec(method, url, data) {
		await axios[method](url, data).then(
			(response) => {
				if (response && response.data && !response.data.error) {
					console.log(chalk.green(response.data.status))
				} else {
					console.log(chalk.red(response.data.status + ' => ' + response.data.error))
				}
			},
			(error) => {
				console.log(chalk.red(error))
			}
		)
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
					console.log(chalk.green('!! Logado !!'))
					result = response.data
				},
				(error) => {
					console.log(chalk.red(error.data.error.parent.detail))
					result = { status: error.data.error.parent.detail }
				}
			)
		return result
	},

}