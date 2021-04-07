const axios = require('axios')
const Server = require('../src/helpers/server')

module.exports = {
	start() {
		this.login((id) => {
			this.userChange(id)
		})
	},

	login(callback) {
		axios.get('/login/user?mail=admin@orcap.com.br&password=123').then(
			(response) => {
				const id = Server.decodedIdByToken(response.data.token)
				axios.defaults.headers.common['Authorization'] =
					'Bearer ' + response.data.token
				callback(id)
			},
			(error) => {
				console.log(error.response.data)
			}
		)
	},

	userChange(id) {
		console.log('-- Alterar usuário')
		const data = { name: 'Admin ' + Date.now() }
		axios.put('/users', data).then(
			(response) => {
				if (response && response.data) console.log(response.data)
			},
			(error) => {
				console.log(error.response.data)
			}
		)
	},
}
