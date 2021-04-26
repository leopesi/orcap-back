/**
 * @module ProvidersController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Provider = require('../../models/basics/provider')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/providers/:id', this.get, this).get(true)
		Server.addRoute('/providers/', this.list, this).get(true)
		Server.addRoute('/providers', this.create, this).post(true)
		Server.addRoute('/providers/:id/restore', this.restore, this).put(true)
		Server.addRoute('/providers/:id', this.change, this).put(true)
		Server.addRoute('/providers/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'providers', 'select')) {
			const provider = await Provider.findOne({ where: { id: req.params.id } })
			if (provider && provider.dataValues && provider.dataValues.id) {
				res.send({ status: 'PROVIDER_GET_SUCCESS', data: provider })
			} else {
				res.send({ status: 'PROVIDER_NOT_FOUND', error: 'Provider not found' })
			}
		} else {
			res.send({ status: 'PROVIDER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'providers', 'select')) {
			const providers = await Provider.findAll({ where: {} })
			if (providers && providers.length > 0) {
				res.send({ status: 'PROVIDER_LIST_SUCCESS', data: providers })
			} else {
				res.send({ status: 'PROVIDERS_QUERY_EMPTY', error: 'Provider not found' })
			}
		} else {
			res.send({ status: 'PROVIDER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'providers', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Provider.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'providers'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'PROVIDER_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'PROVIDER_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'PROVIDER_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'PROVIDER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'providers', 'update')) {
			const result = await Provider.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'PROVIDER_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'PROVIDER_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'PROVIDER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'PROVIDER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'providers', 'delete')) {
			const result = await Provider.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'PROVIDER_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'PROVIDER_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'PROVIDER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'PROVIDER_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'providers', 'restore')) {
			const result = await Provider.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'PROVIDER_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'PROVIDER_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'PROVIDER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'PROVIDER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
