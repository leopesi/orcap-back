const axios = require('axios')
const Server = require('../../src/helpers/server')
const Data = require('../data/data-users')

module.exports = {
	start() {
		this.userCreate((data) => {
			this.login(data, () => {
				this.userChange(data)
			})
		})
	},

	login(data, callback) {
		axios
			.get('/login/user?mail=' + data.mail + '&password=' + data.mail)
			.then(
				(response) => {
					axios.defaults.headers.common['Authorization'] =
						'Bearer ' + response.data.token
					callback()
				},
				(error) => {
					console.log(error.response.data)
				}
			)
	},

	userCreate(callback) {
		for (const i in Data) {
			console.log('-- Usuário Criado')
			axios.post('/users', Data[i]).then(
				(response) => {
					if (response && response.data) console.log(response.data)
					callback(Data[i])
				},
				(error) => {
					console.log(error.response.data)
				}
			)
		}
	},

	userChange(data) {
		console.log('-- Alterar usuário')
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
