/**
 * @module ModelsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Model = require('../../models/basics/model')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/models/:id', this.get, this).get(true)
		Server.addRoute('/models/', this.list, this).get(true)
		Server.addRoute('/models', this.create, this).post(true)
		Server.addRoute('/models/:id/restore', this.restore, this).put(true)
		Server.addRoute('/models/:id', this.change, this).put(true)
		Server.addRoute('/models/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'models', 'select')) {
			const model = await Model.findOne({ where: { id: req.params.id }, include: 'brands' })
			if (model && model.dataValues && model.dataValues.id) {
				res.send({ status: 'MODEL_GET_SUCCESS', data: model })
			} else {
				res.send({ status: 'MODEL_NOT_FOUND', error: 'Model not found' })
			}
		} else {
			res.send({
				status: 'MODEL_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
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
		if (await Permissions.check(req.token, 'models', 'select')) {
			const models = await Model.findAll({ where: {} })
			if (models && models.length > 0) {
				res.send({ status: 'MODEL_LIST_SUCCESS', data: models })
			} else {
				res.send({ status: 'MODELS_QUERY_EMPTY', error: 'Model not found' })
			}
		} else {
			res.send({
				status: 'MODEL_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
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
		if (await Permissions.check(req.token, 'models', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Model.build(req.body)
				.save()
				.then(async (data) => {
					res.send({ status: 'MODEL_INSERT_SUCCESS', data })
				})
				.catch((error) => {
					res.send({ status: 'MODEL_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({
				status: 'MODEL_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
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
		if (await Permissions.check(req.token, 'models', 'update')) {
			const result = await Model.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'MODEL_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'MODEL_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'MODEL_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'MODEL_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
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
		if (await Permissions.check(req.token, 'models', 'delete')) {
			const result = await Model.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'MODEL_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'MODEL_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'MODEL_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'MODEL_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
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
		if (await Permissions.check(req.token, 'models', 'restore')) {
			const result = await Model.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'MODEL_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'MODEL_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'MODEL_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'MODEL_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},
}
