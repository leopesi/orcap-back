const axios = require('axios')
const Server = require('../../src/helpers/server')
const Data = require('../data/data-users')

module.exports = {
	start(callback) {
		this.userCreate((data) => {
			if (!data.error) {
				this.login(data, () => {
					this.userChange(data, () => {
						console.log('USER CAHNGE')
						callback()
					})
				})
			} else {
				console.log(data)
				callback()
			}
		})
	},

	login(data, callback) {
		axios.get('/login/user?mail=' + data.mail + '&password=' + data.mail).then(
			(response) => {
				axios.defaults.headers.common['Authorization'] =
					'Bearer ' + response.data.token
				callback({ token: response.data.token })
			},
			(error) => {
				console.log(error.response.data)
			}
		)
	},

	userCreate(callback) {
		for (const i in Data) {
			console.log('-- Teste de criaçao de Usuário')
			axios.post('/users', Data[i]).then(
				(response) => {
					if (response && response.data && !response.data.error) {
						console.log(response.data)
						callback(Data[i])
					} else if (response && response.data) {
						callback(response.data)
					} else {
						callback({ error: 'Erro no request ' })
					}
				},
				(error) => {
					console.log(error.response.data)
					callback()
				}
			)
		}
	},

	userChange(data, callback) {
		console.log('-- Alterar usuário')
		axios.put('/users', data).then(
			(response) => {
				if (response && response.data) console.log(response.data)
				callback()
			},
			(error) => {
				console.log(error.response.data)
				callback()
			}
		)
		callback()
	},
}
