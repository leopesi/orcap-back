/**
 * @module StatusBudgetsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const CrudBasicsController = require('../defaults/crud-basics')
const StatusBudget = require('../../models/basics/status_budget')

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
		await CrudBasicsController.get(req, res, StatusBudget)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, StatusBudget)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, StatusBudget)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, StatusBudget)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, StatusBudget)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, StatusBudget)
	},
}
