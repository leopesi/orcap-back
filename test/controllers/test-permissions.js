const axios = require('axios')
const Server = require('../../src/helpers/server')
const Data = require('../data/data-users')
const UserTest = require('./test-users')

module.exports = {
	start() {
		UserTest.login(Data[0], () => {
			this.createGroup(() => {
				this.listGroups((data) => {
					console.log(data)
				})
			})

			const types = ['select', 'insert', 'update', 'delete']
			for (let i in types) {
				this.createPermission(types[i], () => {})
			}
			this.listPermissions((data) => {
				console.log(data)
			})
		})
	},

	createGroup(callback) {
		axios.post('/permissions/create-group', { name: 'admin' }).then(
			(response) => {
				callback(response.data)
			},
			(error) => {
				console.log(error.response.data)
			}
		)
	},

	listGroups(callback) {
		axios.get('/permissions/list-groups').then(
			(response) => {
				callback(response.data)
			},
			(error) => {
				console.log(error.response.data)
			}
		)
	},

	createPermission(type, callback) {
		axios.post('/permissions/create-permission', { name: 'admin', table: 'users', type }).then(
			(response) => {
				callback(response.data)
			},
			(error) => {
				console.log(error.response.data)
			}
		)
	},

	listPermissions(callback) {
		axios.get('/permissions/list-permissions').then(
			(response) => {
				callback(response.data)
			},
			(error) => {
				console.log(error.response.data)
			}
		)
	},
}
