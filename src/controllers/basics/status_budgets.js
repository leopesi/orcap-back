/**
 * @module StatusBudgetsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const StatusBudgets = require('../../models/basics/status_budget')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/status_budgets/:id', this.get, this).get(true)
		Server.addRoute('/status_budgets/', this.list, this).get(true)
		Server.addRoute('/status_budgets', this.create, this).post(true)
		Server.addRoute('/status_budgets/:id/restore', this.restore, this).put(true)
		Server.addRoute('/status_budgets/:id', this.change, this).put(true)
		Server.addRoute('/status_budgets/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'status_budgets', 'select')) {
			const status_budgets = await StatusBudgets.findOne({ where: { id: req.params.id } })
			if (status_budgets && status_budgets.dataValues && status_budgets.dataValues.id) {
				res.send({ status_budgets: 'STATUS_BUDGET_GET_SUCCESS', data: status_budgets })
			} else {
				res.send({ status_budgets: 'STATUS_BUDGET_NOT_FOUND', error: 'StatusBudgets not found' })
			}
		} else {
			res.send({ status_budgets: 'STATUS_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'status_budgets', 'select')) {
			const status_budgets = await StatusBudgets.findAll({ where: {} })
			if (status_budgets && status_budgets.length > 0) {
				res.send({ status_budgets: 'STATUS_BUDGET_LIST_SUCCESS', data: status_budgets })
			} else {
				res.send({ status_budgets: 'STATUS_BUDGET_QUERY_EMPTY', error: 'StatusBudgets not found' })
			}
		} else {
			res.send({ status_budgets: 'STATUS_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'status_budgets', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			StatusBudgets.build(req.body)
				.save()
				.then(async (data) => {
					req.body.type = 'admin'
					req.body.table = 'status_budgets'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status_budgets == 'SESSION_INSERT_SUCCESS') {
							res.send({ status_budgets: 'STATUS_BUDGET_INSERT_SUCCESS', data })
						} else {
							res.send({ status_budgets: 'STATUS_BUDGET_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status_budgets: 'STATUS_BUDGET_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status_budgets: 'STATUS_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'status_budgets', 'update')) {
			const result = await StatusBudgets.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				result
					.update(req.body)
					.then((data) => {
						res.send({ status_budgets: 'STATUS_BUDGET_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status_budgets: 'STATUS_BUDGET_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status_budgets: 'STATUS_BUDGET_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status_budgets: 'STATUS_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'status_budgets', 'delete')) {
			const result = await StatusBudgets.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status_budgets: 'STATUS_BUDGET_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status_budgets: 'STATUS_BUDGET_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status_budgets: 'STATUS_BUDGET_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status_budgets: 'STATUS_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'status_budgets', 'restore')) {
			const result = await StatusBudgets.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status_budgets: 'STATUS_BUDGET_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status_budgets: 'STATUS_BUDGET_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status_budgets: 'STATUS_BUDGET_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status_budgets: 'STATUS_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
