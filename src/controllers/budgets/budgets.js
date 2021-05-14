/**
 * @module BudgetsController
 */
const Server = require('../../helpers/server')
const CrudBasicsController = require('../defaults/crud-basics')
const Budget = require('../../models/budgets/budget')
const Logist = require('../../models/sessions/logist')
const Seller = require('../../models/sessions/Seller')
const Client = require('../../models/sessions/Client')
const Format = require('../../models/basics/format')
const StatusBudget = require('../../models/basics/status_budget')
const TypeBudget = require('../../models/basics/type_budget')

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

		Budget.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })
		Budget.belongsTo(Seller, { foreignKey: 'seller_id', as: 'sellers' })
		Budget.belongsTo(Client, { foreignKey: 'client_id', as: 'clients' })
		Budget.belongsTo(Format, { foreignKey: 'format_id', as: 'formats' })
		Budget.belongsTo(StatusBudget, { foreignKey: 'status_budget_id', as: 'status_budgets' })
		Budget.belongsTo(TypeBudget, { foreignKey: 'type_budget_id', as: 'types_budgets' })
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
		await CrudBasicsController.list(req, res, Budget)
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
		await CrudBasicsController.change(req, res, Budget)
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
