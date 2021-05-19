/**
 * @module FiltersController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const CrudBasicsController = require('../defaults/crud-basics')
const Dimensions = require('../defaults/dimensions')
const Equipments = require('./equipments')

const Filter = require('../../models/equipments/filter')
const Equipment = require('../../models/equipments/equipment')
const Brand = require('../../models/basics/brand')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/filters-by-dimension', this.filtersByDimension, this).post(true)
		Server.addRoute('/filters/:id', this.get, this).get(true)
		Server.addRoute('/filters/', this.list, this).get(true)
		Server.addRoute('/filters', this.create, this).post(true)
		Server.addRoute('/filters/:id/restore', this.restore, this).put(true)
		Server.addRoute('/filters/:id', this.change, this).put(true)
		Server.addRoute('/filters/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Filter.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	/**
	 * @function
	 * Busca os filtros pela dimensao da piscina
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async filtersByDimension(req, res, self) {
		if (await Permissions.check(req.token, 'filters', 'select')) {
			const dimension = Dimensions.creatDimension(
				req.body.length,
				req.body.width,
				req.body.initial_depth,
				req.body.final_depth,
				req.body.sidewalk_width
			)
			const max_capacity = Dimensions.getM3Real(dimension)
			const filters = await Filter.findAll({
				where: { max_capacity: { [Op.gte]: !isNaN(max_capacity) ? max_capacity : 0 } },
				include: 'equipments',
			})
			if (filters && filters[0]) {
				await Equipments.updateRelations(filters)
				res.send({ status: 'FILTERS_GET_SUCCESS', data: filters })
			} else {
				res.send({ status: 'FILTERS_NOT_FOUND', error: 'filters not found' })
			}
		} else {
			res.send({ status: 'FILTERS_PERMISSION_ERROR', error: 'Action not allowed' })
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
		await CrudBasicsController.get(req, res, Filter)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, Filter)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Filter)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, Filter)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Filter)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Filter)
	},
}
