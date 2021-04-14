/**
 * @module PermissionsController
 */
const Server = require('../helpers/server')
const Group = require('../models/permission-group')
const Permission = require('../models/permission')

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
	check() {
		return true
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
			res.send({ message: 'INVALID_PERMISSION' })
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
			res.send({ message: 'INVALID_PERMISSION' })
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
			res.send({ message: 'INVALID_PERMISSION' })
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
			res.send({ message: 'INVALID_PERMISSION' })
		}
	},
}
