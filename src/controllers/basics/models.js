/**
 * @module ModelsController
 */
const Server = require('../../helpers/server')
const CrudBasicsController = require('../defaults/crud-basics')
const Model = require('../../models/basics/model')
const Brand = require('../../models/basics/brand')

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
		Model.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brands' })
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await CrudBasicsController.get(req, res, Model)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, Model)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Model)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, Model)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Model)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Model)
	},
}
