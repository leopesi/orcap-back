/**
 * @module SellersController
 */
const Server = require('../../helpers/server')
const Permissions = require('./permissions')
const Sessions = require('./sessions')
const Seller = require('../../models/sessions/seller')
const Session = require('../../models/sessions/session')

module.exports = {
	/**
	 * @function
	 * Seta as rotas dos Selleras
	 */
	setRoutes() {
		Server.addRoute('/sellers/:id', this.get, this).get(true)
		Server.addRoute('/sellers/', this.list, this).get(true)
		Server.addRoute('/sellers', this.create, this).post(true)
		Server.addRoute('/sellers/:id/restore', this.restore, this).put(true)
		Server.addRoute('/sellers/:id', this.change, this).put(true)
		Server.addRoute('/sellers/:id', this.delete, this).delete(true)
		Seller.belongsTo(Session, { foreignKey: 'session_id', as: 'sessions' })
	},

	/**
	 * @function
	 * Retorna um Sellera
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'sellers', 'select')) {
			const seller = await Seller.findOne({
				where: { id: req.params.id },
				include: 'sessions',
			})
			delete seller.password
			if (seller && seller.id) {
				res.send({ status: 'SELLER_GET_SUCCESS', data: seller })
			} else {
				res.send({ status: 'SELLER_NOT_FOUND', error: 'Seller not found' })
			}
		} else {
			res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Lista de Sellera
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		if (await Permissions.check(req.token, 'sellers', 'select')) {
			const sellers = await Seller.findAll({ where: {}, include: 'sessions' })
			if (sellers && sellers.length > 0) {
				res.send({ status: 'SELLER_LIST_SUCCESS', data: sellers })
			} else {
				res.send({ status: 'SELLERS_QUERY_EMPTY', error: 'Seller not found' })
			}
		} else {
			res.send({
				status: 'SELLER_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Cria um Sellera
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		delete req.body.id
		if (await Permissions.check(req.token, 'sellers', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			req.body.type = 'admin'
			req.body.table = 'sellers'
			Sessions.create(req, (result) => {
				if (result.status == 'SESSION_INSERT_SUCCESS') {
					req.body.session_id = result.data.id
					Seller.build(req.body)
						.save()
						.then(async (data) => {
							res.send({ status: 'SELLER_INSERT_SUCCESS', data })
						})
						.catch((error) => {
							res.send({
								status: 'SELLER_INSERT_ERROR',
								error: error.parent.detail,
							})
						})
				} else {
					res.send({ status: 'SESSION_INSERT_ERROR', error: result.error })
				}
			})
		} else {
			res.send({ status: 'SELLER_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Altera um Sellera
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req.token, 'sellers', 'update')) {
			const result = await Seller.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				delete req.body.mail
				delete req.body.password
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'SELLER_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'SELLER_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'SELLER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'SELLER_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Deleta um Sellera
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		if (await Permissions.check(req.token, 'sellers', 'delete')) {
			const result = await Seller.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'SELLER_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'SELLER_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'SELLER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'SELLER_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},

	/**
	 * @function
	 * Deleta um Sellera
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		if (await Permissions.check(req.token, 'sellers', 'restore')) {
			const result = await Seller.findOne({ where: { id: req.params.id } })
			if (result) {
				delete req.body.mail
				delete req.body.password
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'SELLER_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'SELLER_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'SELLER_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({
				status: 'SELLER_PERMISSION_ERROR',
				error: 'Action not allowed',
			})
		}
	},
}
