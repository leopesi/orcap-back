/**
 * @module PaymentsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const Payment = require('../../models/basics/payment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/payments/:id', this.get, this).get(true)
		Server.addRoute('/payments/', this.list, this).get(true)
		Server.addRoute('/payments', this.create, this).post(true)
		Server.addRoute('/payments/:id/restore', this.restore, this).put(true)
		Server.addRoute('/payments/:id', this.change, this).put(true)
		Server.addRoute('/payments/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'payments', 'select')) {
			const payment = await Payment.findOne({ where: { id: req.params.id } })
			if (payment && payment.dataValues && payment.dataValues.id) {
				res.send({ status: 'PAYMENT_GET_SUCCESS', data: payment })
			} else {
				res.send({ status: 'PAYMENT_NOT_FOUND', error: 'Payment not found' })
			}
		} else {
			res.send({ status: 'PAYMENT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'payments', 'select')) {
			const payments = await Payment.findAll({ where: {} })
			if (payments && payments.length > 0) {
				res.send({ status: 'PAYMENT_LIST_SUCCESS', data: payments })
			} else {
				res.send({ status: 'PAYMENTS_QUERY_EMPTY', error: 'Payment not found' })
			}
		} else {
			res.send({ status: 'PAYMENT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'payments', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			Payment.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'payments'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'PAYMENT_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'PAYMENT_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'PAYMENT_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'PAYMENT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'payments', 'update')) {
			const result = await Payment.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'PAYMENT_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'PAYMENT_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'PAYMENT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'PAYMENT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'payments', 'delete')) {
			const result = await Payment.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'PAYMENT_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'PAYMENT_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'PAYMENT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'PAYMENT_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'payments', 'restore')) {
			const result = await Payment.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'PAYMENT_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'PAYMENT_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'PAYMENT_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'PAYMENT_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
