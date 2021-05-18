/**
 * @module BlanketsController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const CrudBasicsController = require('../defaults/crud-basics')
const Dimensions = require('../defaults/dimensions')

const Blanket = require('../../models/equipments/blanket')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/blankets-by-dimension', this.blanketsByDimension, this).post(true)
		Server.addRoute('/blankets/:id', this.get, this).get(true)
		Server.addRoute('/blankets/', this.list, this).get(true)
		Server.addRoute('/blankets', this.create, this).post(true)
		Server.addRoute('/blankets/:id/restore', this.restore, this).put(true)
		Server.addRoute('/blankets/:id', this.change, this).put(true)
		Server.addRoute('/blankets/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Blanket.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	async blanketsByDimension(req, res, self) {
		if (await Permissions.check(req.token, 'blankets', 'select')) {
			const dimension = Dimensions.creatDimension(
				req.body.length,
				req.body.width,
				req.body.initial_depth,
				req.body.final_depth,
				req.body.sidewalk_width
			)
			const max_capacity = Dimensions.getM3Real(dimension)
			const md = await Blanket.findAll({
				where: { max_capacity: { [Op.gte]: !isNaN(max_capacity) ? max_capacity : 0 } },
				include: 'equipments',
			})
			if (md && md[0]) {
				res.send({ status: 'BLANKETS_GET_SUCCESS', data: md })
			} else {
				res.send({ status: 'BLANKETS_NOT_FOUND', error: 'blankets not found' })
			}
		} else {
			res.send({ status: 'BLANKETS_PERMISSION_ERROR', error: 'Action not allowed' })
		}
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await CrudBasicsController.get(req, res, Blanket)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, Blanket)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Blanket)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, Blanket)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Blanket)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Blanket)
	},
}
