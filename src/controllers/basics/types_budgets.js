/**
 * @module TypesBudgetsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const BudgetType = require('../../models/basics/type_budget')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/types_budgets/:id', this.get, this).get(true)
		Server.addRoute('/types_budgets/', this.list, this).get(true)
		Server.addRoute('/types_budgets', this.create, this).post(true)
		Server.addRoute('/types_budgets/:id/restore', this.restore, this).put(true)
		Server.addRoute('/types_budgets/:id', this.change, this).put(true)
		Server.addRoute('/types_budgets/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		if (await Permissions.check(req.token, 'types_budgets', 'select')) {
			const budget_type = await BudgetType.findOne({ where: { id: req.params.id } })
			if (budget_type && budget_type.dataValues && budget_type.dataValues.id) {
				res.send({ status: 'TYPE_BUDGET_GET_SUCCESS', data: budget_type })
			} else {
				res.send({ status: 'TYPE_BUDGET_NOT_FOUND', error: 'BudgetType not found' })
			}
		} else {
			res.send({ status: 'TYPE_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types_budgets', 'select')) {
			const types_budgets = await BudgetType.findAll({ where: {} })
			if (types_budgets && types_budgets.length > 0) {
				res.send({ status: 'TYPE_BUDGET_LIST_SUCCESS', data: types_budgets })
			} else {
				res.send({ status: 'TYPE_BUDGETS_QUERY_EMPTY', error: 'BudgetType not found' })
			}
		} else {
			res.send({ status: 'TYPE_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types_budgets', 'insert')) {
			req.body.password = await Server.getHash(req.body.password)
			BudgetType.build(req.body)
				.save()
				.then(async (data) => {
					req.body.budget_type = 'admin'
					req.body.table = 'types_budgets'
					req.body.person = data.id
					Sessions.create(req, (result) => {
						if (result.status == 'SESSION_INSERT_SUCCESS') {
							res.send({ status: 'TYPE_BUDGET_INSERT_SUCCESS', data })
						} else {
							res.send({ status: 'TYPE_BUDGET_INSERT_ERROR', error: result.error })
						}
					})
				})
				.catch((error) => {
					res.send({ status: 'TYPE_BUDGET_INSERT_ERROR', error: error.parent.detail })
				})
		} else {
			res.send({ status: 'TYPE_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types_budgets', 'update')) {
			const result = await BudgetType.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.id = result.dataValues.id
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'TYPE_BUDGET_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'TYPE_BUDGET_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'TYPE_BUDGET_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'TYPE_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types_budgets', 'delete')) {
			const result = await BudgetType.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = false
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'TYPE_BUDGET_DELETE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'TYPE_BUDGET_DELETE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'TYPE_BUDGET_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'TYPE_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
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
		if (await Permissions.check(req.token, 'types_budgets', 'restore')) {
			const result = await BudgetType.findOne({ where: { id: req.params.id } })
			if (result) {
				req.body.active = true
				result
					.update(req.body)
					.then((data) => {
						res.send({ status: 'TYPE_BUDGET_RESTORE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'TYPE_BUDGET_RESTORE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'TYPE_BUDGET_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'TYPE_BUDGET_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},
}
