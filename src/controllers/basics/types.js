/**
 * @module TypesController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Type = require('../../models/basics/type')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/types/:id', this.get, this).get(true)
		Server.addRoute('/types/', this.list, this).get(true)
		Server.addRoute('/types', this.create, this).post(true)
		Server.addRoute('/types/:id/restore', this.restore, this).put(true)
		Server.addRoute('/types/:id', this.change, this).put(true)
		Server.addRoute('/types/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'types', 'select')) {
			const type = await Type.findOne({ where: { id: req.params.id } })
			if (type && type.dataValues && type.dataValues.id) {
				res.send({ status: 'TYPE_GET_SUCCESS', data: type })
			} else {
				res.send({ status: 'TYPE_NOT_FOUND', error: 'Type not found' })
			}
		} else {
			res.send({ status: 'TYPE_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types', 'select')) {
			const types = await Type.findAll({ where: {} })
			if (types && types.length > 0) {
				res.send({ status: 'TYPE_LIST_SUCCESS', data: types })
			} else {
				res.send({ status: 'TYPES_QUERY_EMPTY', error: 'Type not found' })
			}
		} else {
			res.send({ status: 'TYPE_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Type.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'types'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'TYPE_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'TYPE_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'TYPE_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'TYPE_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types', 'update')) {
			const result = await Type.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'TYPE_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'TYPE_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'TYPE_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'TYPE_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types', 'delete')) {
			const result = await Type.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'TYPE_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'TYPE_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'TYPE_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'TYPE_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types', 'restore')) {
			const result = await Type.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'TYPE_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'TYPE_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'TYPE_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'TYPE_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
