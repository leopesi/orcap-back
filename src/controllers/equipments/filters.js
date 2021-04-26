/**
 * @module FiltersController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Filter = require('../../models/equipments/filter')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/filters/:id', this.get, this).get(true)
		Server.addRoute('/filters/', this.list, this).get(true)
		Server.addRoute('/filters', this.create, this).post(true)
		Server.addRoute('/filters/:id/restore', this.restore, this).put(true)
		Server.addRoute('/filters/:id', this.change, this).put(true)
		Server.addRoute('/filters/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'filters', 'select')) {
			const filter = await Filter.findOne({ where: { id: req.params.id } })
			if (filter && filter.dataValues && filter.dataValues.id) {
				res.send({ status: 'FILTER_GET_SUCCESS', data: filter })
			} else {
				res.send({ status: 'FILTER_NOT_FOUND', error: 'Filter not found' })
			}
		} else {
			res.send({ status: 'FILTER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'filters', 'select')) {
			const filters = await Filter.findAll({ where: {} })
			if (filters && filters.length > 0) {
				res.send({ status: 'FILTER_LIST_SUCCESS', data: filters })
			} else {
				res.send({ status: 'FILTERS_QUERY_EMPTY', error: 'Filter not found' })
			}
		} else {
			res.send({ status: 'FILTER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'filters', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Filter.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'filters'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'FILTER_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'FILTER_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'FILTER_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'FILTER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'filters', 'update')) {
			const result = await Filter.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'FILTER_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'FILTER_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'FILTER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'FILTER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'filters', 'delete')) {
			const result = await Filter.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'FILTER_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'FILTER_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'FILTER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'FILTER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'filters', 'restore')) {
			const result = await Filter.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'FILTER_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'FILTER_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'FILTER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'FILTER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
