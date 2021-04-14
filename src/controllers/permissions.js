/**
 * @module PermissionsController
 */
const Server = require('../helpers/server')
const Group = require('../models/permission-group')
const Permission = require('../models/permission')
const User = require('../models/user')

module.exports = {
	/**
	 * @function
	 * Seta as rotas das Permissão
	 */
	setRoutes() {
		Server.addRoute('/permissions/list-groups', this.listGroups, this).get(true)
		Server.addRoute('/permissions/create-group', this.createGroup, this).post(
			true
		)
		Server.addRoute(
			'/permissions/list-permissions',
			this.listPermissions,
			this
		).get(true)
		Server.addRoute(
			'/permissions/create-permission',
			this.createPermission,
			this
		).post(true)
	},

	/**
	 * Verifica a permissão
	 * @returns {Boolean}
	 */
	async check(req, table, type) {
		const id = Server.decodedIdByToken(req.token)
		if (id) {
			const user = await User.findOne({ where: { id } })
			const permission = await Permission.findAll({
				where: { name: user.type, table, type },
			})
			if (permission[0]) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	},

	/**
	 * Lista grupos de permissão
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async listGroups(req, res, self) {
		if (self.check()) {
			const groups = await Group.findAll({
				where: {},
			})
			res.send({ groups })
		} else {
			res.send({ status: 'INVALID_PERMISSION' })
		}
	},

	/**
	 * Cria grupos de permissão
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
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
			res.send({ status: 'INVALID_PERMISSION' })
		}
	},

	/**
	 * Lista permissão
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async listPermissions(req, res, self) {
		if (self.check()) {
			const permissions = await Permission.findAll({
				where: {},
			})
			res.send({ permissions })
		} else {
			res.send({ status: 'INVALID_PERMISSION' })
		}
	},

	/**
	 * Cria permissão
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
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
			res.send({ status: 'INVALID_PERMISSION' })
		}
	},
}
