const axios = require('axios')
const chalk = require('chalk')

module.exports = {
	async exec(method, url, data) {
		await axios[method](url, data).then(
			(response) => {
				if (response && response.data && !response.data.error) {
					console.log(chalk.green(response.data.status))
				} else {
					console.log(
						chalk.red(response.data.status + ' => ' + response.data.error)
					)
				}
			},
			(error) => {
				console.log(chalk.red(error))
			}
		)
	},

	async login(table, data) {
		console.log(
			chalk.blue('\n-- Logar com ' + table + ' ( ' + data.mail + ' )')
		)
		let result = {}
		await axios
			.get(
				'/login?mail=' + data.mail + '&password=' + data.password
			)
			.then(
				(response) => {
					axios.defaults.headers.common['Authorization'] =
						'Bearer ' + response.data.token
					result = response.data
				},
				(error) => {
					if (error.data) {
						console.log(chalk.red(error.data.error.parent.detail))
						result = { status: error.data.error.parent.detail }
					} else {
						console.log(chalk.red(error))
						result = { status: error }
					}
				}
			)
		return result
	},
}
