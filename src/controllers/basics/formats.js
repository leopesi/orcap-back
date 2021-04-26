/**
 * @module FormatsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Format = require('../../models/basics/format')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/formats/:id', this.get, this).get(true)
		Server.addRoute('/formats/', this.list, this).get(true)
		Server.addRoute('/formats', this.create, this).post(true)
		Server.addRoute('/formats/:id/restore', this.restore, this).put(true)
		Server.addRoute('/formats/:id', this.change, this).put(true)
		Server.addRoute('/formats/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'formats', 'select')) {
			const format = await Format.findOne({ where: { id: req.params.id } })
			if (format && format.dataValues && format.dataValues.id) {
				res.send({ status: 'FORMAT_GET_SUCCESS', data: format })
			} else {
				res.send({ status: 'FORMAT_NOT_FOUND', error: 'Format not found' })
			}
		} else {
			res.send({ status: 'FORMAT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'formats', 'select')) {
			const formats = await Format.findAll({ where: {} })
			if (formats && formats.length > 0) {
				res.send({ status: 'FORMAT_LIST_SUCCESS', data: formats })
			} else {
				res.send({ status: 'FORMATS_QUERY_EMPTY', error: 'Format not found' })
			}
		} else {
			res.send({ status: 'FORMAT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'formats', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Format.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'formats'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'FORMAT_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'FORMAT_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'FORMAT_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'FORMAT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'formats', 'update')) {
			const result = await Format.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'FORMAT_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'FORMAT_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'FORMAT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'FORMAT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'formats', 'delete')) {
			const result = await Format.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'FORMAT_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'FORMAT_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'FORMAT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'FORMAT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'formats', 'restore')) {
			const result = await Format.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'FORMAT_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'FORMAT_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'FORMAT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'FORMAT_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
