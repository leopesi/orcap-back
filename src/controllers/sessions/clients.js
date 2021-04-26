/**
 * @module ClientsController
 */
const Server = require('../../helpers/server')
const Permissions = require('./permissions')
const Client = require('../../models/sessions/client')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Clientas
	 */
	setRoutes() {
		Server.addRoute('/clients/:id', this.get, this).get(true)
		Server.addRoute('/clients/', this.list, this).get(true)
		Server.addRoute('/clients', this.create, this).post(true)
		Server.addRoute('/clients/:id/restore', this.restore, this).put(true)
		Server.addRoute('/clients/:id', this.change, this).put(true)
		Server.addRoute('/clients/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'clients', 'select')) {
			const client = await Client.findOne({ where: { id: req.params.id } })
			if (client && client.dataValues && client.dataValues.id) {
				res.send({ status: 'CLIENT_GET_SUCCESS', data: client })
			} else {
				res.send({ status: 'CLIENT_NOT_FOUND', error: 'Client not found' })
			}
		} else {
			res.send({
				status: 'CLIENT_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Lista de Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		if (await Permissions.check(req.token, 'clients', 'select')) {
			const clients = await Client.findAll({ where: {} })
			if (clients && clients.length > 0) {
				res.send({ status: 'CLIENT_LIST_SUCCESS', data: clients })
			} else {
				res.send({ status: 'CLIENTS_QUERY_EMPTY', error: 'Client not found' })
			}
		} else {
			res.send({
				status: 'CLIENT_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Cria um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		if (await Permissions.check(req.token, 'clients', 'insert')) {
			delete req.body.id
			req.body.password = await Server.getHash(req.body.password)
			Client.build(req.body)
				.save()
				.then((data) => {
					res.send({ status: 'CLIENT_INSERT_SUCCESS', data })
				})
				.catch((error) => {
					res.send({
						status: 'CLIENT_INSERT_ERROR',
						error: error.parent.detail,
					})
				})
		} else {
			res.send({
				status: 'CLIENT_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Altera um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req.token, 'clients', 'update')) {
			const result = await Client.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'CLIENT_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'CLIENT_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'CLIENT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'CLIENT_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Deleta um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		if (await Permissions.check(req.token, 'clients', 'delete')) {
			const result = await Client.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'CLIENT_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'CLIENT_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'CLIENT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'CLIENT_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Deleta um Clienta
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		if (await Permissions.check(req.token, 'clients', 'restore')) {
			const result = await Client.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'CLIENT_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'CLIENT_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'CLIENT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'CLIENT_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},
}
