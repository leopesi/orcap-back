const axios = require('axios')
const Server = require('../../src/helpers/server')
const Data = require('../data/data-users')

module.exports = {
	
	start() {
		this.listGroups((data) => {
			console.log(data)
		})
	},

	listGroups(data, callback) {
		axios.get('/permission/list-groups').then(
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

}
