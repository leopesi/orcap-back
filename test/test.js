const axios = require('axios')
const { response } = require('express')

require('../src')

let AUTH_TOKEN = ''

axios.defaults.baseURL = 'http://localhost:3333/'

login = (callback) => {
	axios
		.get('/login?mail=admin@orcap.com.br&password=123')
		.catch((error) => {
			console.log(error)
		})
		.then((response) => {
			AUTH_TOKEN = response.data.token
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN
			callback()
		})
}

userChange = () => {
	login(() => {
		axios
			.post('/users/', { name: 'Admin ' + Date.now() })
			.catch((error) => {
				console.log(error.response.data)
			})
			.then((response) => {
				if (response && response.data) console.log(response.data)
			})
	})
}

userChange()
