/**
 * @module PermissionsController
 */
const Server = require('../helpers/server')
const Group = require('../models/permission-group')

module.exports = {
	setRoutes() {
		Server.addRoute('/session/list-groups', this.listGroups, this).get(true)
		Server.addRoute('/session/create-group', this.createGroup, this).post(true)
	},

	check() {
		return true
	},

	async listGroups(req, res, self) {
		if (this.check()) {
			const groups = await Group.findAll({
				where: {},
			})
			res.send({ groups })
		} else {
			res.send({ message: 'INVALID_PERMISSION' })
		}
	},

	createGroup(req, res, self) {},
}
