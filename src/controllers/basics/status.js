/**
 * @module StatusController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Status = require('../../models/basics/status')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/status/:id', this.get, this).get(true)
		Server.addRoute('/status/', this.list, this).get(true)
		Server.addRoute('/status', this.create, this).post(true)
		Server.addRoute('/status/:id/restore', this.restore, this).put(true)
		Server.addRoute('/status/:id', this.change, this).put(true)
		Server.addRoute('/status/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'status', 'select')) {
			const status = await Status.findOne({ where: { id: req.params.id } })
			if (status && status.dataValues && status.dataValues.id) {
				res.send({ status: 'STATUS_GET_SUCCESS', data: status })
			} else {
				res.send({ status: 'STATUS_NOT_FOUND', error: 'Status not found' })
			}
		} else {
			res.send({ status: 'STATUS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		if (await Permissions.check(req.token, 'status', 'select')) {
			const status = await Status.findAll({ where: {} })
			if (status && status.length > 0) {
				res.send({ status: 'STATUS_LIST_SUCCESS', data: status })
			} else {
				res.send({ status: 'STATUS_QUERY_EMPTY', error: 'Status not found' })
			}
		} else {
			res.send({ status: 'STATUS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		delete req.body.id
		if (await Permissions.check(req.token, 'status', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Status.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'status'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'STATUS_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'STATUS_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'STATUS_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'STATUS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req.token, 'status', 'update')) {
			const result = await Status.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'STATUS_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'STATUS_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'STATUS_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'STATUS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		if (await Permissions.check(req.token, 'status', 'delete')) {
			const result = await Status.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'STATUS_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'STATUS_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'STATUS_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'STATUS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		if (await Permissions.check(req.token, 'status', 'restore')) {
			const result = await Status.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'STATUS_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'STATUS_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'STATUS_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'STATUS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
