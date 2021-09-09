/**
 * @module PermissionsController
 */
const Server = require('../../helpers/server')
const Group = require('../../models/permissions/permission-group')
const Permission = require('../../models/permissions/permission')
const Session = require('../../models/sessions/session')
const User = require('../../models/sessions/user')
const Logist = require('../../models/sessions/logist')

module.exports = {
	/**
	 * @function
	 * Seta as rotas das Permissão
	 */
	setRoutes() {
		Server.addRoute('/permissions/list-groups', this.listGroups, this).get(true)
		Server.addRoute('/permissions/create-group', this.createGroup, this).post(true)
		Server.addRoute('/permissions/list-permissions', this.listPermissions, this).get(true)
		Server.addRoute('/permissions/create-permission', this.createPermission, this).post(true)
	},

	/**
	 * Verifica a permissão
	 * @returns {Boolean}
	 */
	async check(token, permissionTable, permissiontType) {
		const id = Server.decodedIdByToken(token)
		if (id) {
			const session = await this.getSession(id)
			const permission = await Permission.findAll({
				where: {
					name: session.type,
					table: permissionTable,
					type: permissiontType,
				},
			})
			if (permission && permission[0]) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	},

	async getSession(id) {
		const session = await Session.findOne({
			where: { id },
			include: ['users', 'logists', 'sellers', 'clients'],
		})
		let data = {}
		data.type = []
		if (session) {
			if (session.users) {
				data.type.push('user')
			}
			if (session.logists) {
				data.type.push('logist')
			}
			if (session.sellers) {
				data.type.push('seller')
			}
			if (session.clients) {
				data.type.push('client')
			}
		}
		return data
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
					res.send(error)
				})
		} else {
			res.send({ status: 'INVALID_PERMISSION' })
		}
	},
}
