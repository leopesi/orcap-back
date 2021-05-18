/**
 * @module VinylsController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const CrudBasicsController = require('../defaults/crud-basics')
const Dimensions = require('../defaults/dimensions')

const Vinyl = require('../../models/equipments/vinyl')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/vinyls-by-dimension', this.vinylsByDimension, this).post(true)
		Server.addRoute('/vinyls/:id', this.get, this).get(true)
		Server.addRoute('/vinyls/', this.list, this).get(true)
		Server.addRoute('/vinyls', this.create, this).post(true)
		Server.addRoute('/vinyls/:id/restore', this.restore, this).put(true)
		Server.addRoute('/vinyls/:id', this.change, this).put(true)
		Server.addRoute('/vinyls/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Vinyl.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	async vinylsByDimension(req, res, self) {
		if (await Permissions.check(req.token, 'vinyls', 'select')) {
			const dimension = Dimensions.creatDimension(
				req.body.length,
				req.body.width,
				req.body.initial_depth,
				req.body.final_depth,
				req.body.sidewalk_width
			)
			const max_capacity = Dimensions.getM3Real(dimension)
			const md = await Vinyl.findAll({
				where: { max_capacity: { [Op.gte]: !isNaN(max_capacity) ? max_capacity : 0 } },
				include: 'equipments',
			})
			if (md && md[0]) {
				res.send({ status: 'VINYLS_GET_SUCCESS', data: md })
			} else {
				res.send({ status: 'VINYLS_NOT_FOUND', error: 'vinyls not found' })
			}
		} else {
			res.send({ status: 'VINYLS_PERMISSION_ERROR', error: 'Action not allowed' })
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
		await CrudBasicsController.get(req, res, Vinyl)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await CrudBasicsController.list(req, res, Vinyl)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await CrudBasicsController.create(req, res, Vinyl)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await CrudBasicsController.change(req, res, Vinyl)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await CrudBasicsController.delete(req, res, Vinyl)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await CrudBasicsController.restore(req, res, Vinyl)
	},
}
