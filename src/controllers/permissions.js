/**
 * @module PermissionsController
 */
const Server = require('../helpers/server')
const Group = require('../models/permission-group')
const Permission = require('../models/permission')

module.exports = {
	setRoutes() {
		Server.addRoute('/permissions/list-groups', this.listGroups, this).get(true)
		Server.addRoute('/permissions/create-group', this.createGroup, this).post(true)
		Server.addRoute('/permissions/list-permissions', this.listPermissions, this).get(true)
		Server.addRoute('/permissions/create-permission', this.createPermission, this).post(true)
	},

	check() {
		return true
	},

	async listGroups(req, res, self) {
		if (self.check()) {
			const groups = await Group.findAll({
				where: {},
			})
			res.send({ groups })
		} else {
			res.send({ message: 'INVALID_PERMISSION' })
		}
	},

	createGroup(req, res, self) {
		if (self.check()) {
			Group.build(req.body)
				.save()
				.then((data) => {
					res.send(data)
				})
				.catch((error) => {
					console.log(error)
					res.send(error)
				})
		} else {
			res.send({ message: 'INVALID_PERMISSION' })
		}
	},

	async listPermissions(req, res, self) {
		if (self.check()) {
			const permissions = await Permission.findAll({
				where: {},
			})
			res.send({ permissions })
		} else {
			res.send({ message: 'INVALID_PERMISSION' })
		}
	},

	createPermission(req, res, self) {
		if (self.check()) {
			Permission.build(req.body)
				.save()
				.then((data) => {
					res.send(data)
				})
				.catch((error) => {
					console.log(error)
					res.send(error)
				})
		} else {
			res.send({ message: 'INVALID_PERMISSION' })
		}
	},
}
