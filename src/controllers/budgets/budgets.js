/**
 * @module BudgetsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const CrudBasicsController = require('../defaults/crud-basics')
const Budget = require('../../models/budgets/budget')
const BudgetEquipment = require('../../models/budgets/budget_equipment')
const Logist = require('../../models/sessions/logist')
const Seller = require('../../models/sessions/Seller')
const Client = require('../../models/sessions/Client')
const Format = require('../../models/basics/format')
const StatusBudget = require('../../models/basics/status_budget')
const TypeBudget = require('../../models/basics/type_budget')
const Payment = require('../../models/basics/payment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/budgets/:id', this.get, this).get(true)
		Server.addRoute('/budgets/', this.list, this).get(true)
		Server.addRoute('/budgets', this.create, this).post(true)
		Server.addRoute('/budgets/:id/restore', this.restore, this).put(true)
		Server.addRoute('/budgets/:id', this.change, this).put(true)
		Server.addRoute('/budgets/:id', this.delete, this).delete(true)

		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Budget.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })
		Budget.belongsTo(Seller, { foreignKey: 'seller_id', as: 'sellers' })
		Budget.belongsTo(Client, { foreignKey: 'client_id', as: 'clients' })
		Budget.belongsTo(Format, { foreignKey: 'format_id', as: 'formats' })
		Budget.belongsTo(StatusBudget, { foreignKey: 'status_budget_id', as: 'status_budgets' })
		Budget.belongsTo(TypeBudget, { foreignKey: 'type_budget_id', as: 'types_budgets' })
		Budget.belongsTo(Payment, { foreignKey: 'payment_id', as: 'payments' })
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await CrudBasicsController.get(req, res, Budget)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		const include = ['clients', 'sellers', 'payments', 'status_budgets', 'types_budgets']
		await CrudBasicsController.list(req, res, Budget, include)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Budget)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		if (await Permissions.check(req.token, 'budgets', 'update')) {
			const budgets = await Budget.findOne({ where: { id: req.params.id } })
			if (budgets) {
				req.body.id = budgets.dataValues.id
				budgets.update(req.body)
					.then((data) => {
						for (const i in req.body.equipments) {
							// const equipment = req.body.equipments[i]
							// BudgetEquipment
						}
						res.send({ status: 'BUDGETS_UPDATE_SUCCESS', data })
					})
					.catch((error) => {
						res.send({
							status: 'BUDGETS_UPDATE_ERROR',
							error: error.parent.detail,
						})
					})
			} else {
				res.send({
					status: 'BUDGETS_NOT_FOUND',
					error: req.params,
				})
			}
		} else {
			res.send({ status: 'BUDGETS_PERMISSION_ERROR', error: 'Action not allowed' })
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
		await CrudBasicsController.delete(req, res, Budget)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Budget)
	},
}