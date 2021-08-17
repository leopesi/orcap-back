/**
 * @module FormatsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const FormBasicsController = require('../defaults/form-basics')
const Format = require('../../models/basics/format')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/formats/:id', this.get, this).get(true)
		Server.addRoute('/formats/', this.list, this).get(true)
		Server.addRoute('/formats', this.create, this).post(true)
		Server.addRoute('/formats/:id/restore', this.restore, this).put(true)
		Server.addRoute('/formats/:id', this.change, this).put(true)
		Server.addRoute('/formats/:id', this.delete, this).delete(true)
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await FormBasicsController.get(req, res, Format)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await FormBasicsController.list(req, res, Format)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await FormBasicsController.create(req, res, Format)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await FormBasicsController.change(req, res, Format)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await FormBasicsController.delete(req, res, Format)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await FormBasicsController.restore(req, res, Format)
	},
}
