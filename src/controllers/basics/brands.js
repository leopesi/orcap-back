/**
 * @module BrandsController
 */
const isuuid = require('isuuid')
const Server = require('../../helpers/server')
const CrudBasicsController = require('../defaults/crud-basics')
const Brand = require('../../models/basics/brand')
const Logist = require('../../models/sessions/logist')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/brands/:id', this.get, this).get(true)
		Server.addRoute('/brands/', this.list, this).get(true)
		Server.addRoute('/brands', this.create, this).post(true)
		Server.addRoute('/brands/:id/restore', this.restore, this).put(true)
		Server.addRoute('/brands/:id', this.change, this).put(true)
		Server.addRoute('/brands/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Brand.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await CrudBasicsController.get(req, res, Brand)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, Brand)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Brand)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, Brand)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Brand)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Brand)
	},
}
