/**
 * @module EnginesController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const EquipmentBasicsController = require('../defaults/equipment-basics')
const Dimensions = require('../defaults/dimensions')
const Equipments = require('./equipments')

const Engine = require('../../models/equipments/engine')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/engines-by-dimension', this.enginesByDimension, this).post(true)
		Server.addRoute('/engines/:id', this.get, this).get(true)
		Server.addRoute('/engines/', this.list, this).get(true)
		Server.addRoute('/engines', this.create, this).post(true)
		Server.addRoute('/engines/:id/restore', this.restore, this).put(true)
		Server.addRoute('/engines/:id', this.change, this).put(true)
		Server.addRoute('/engines/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Engine.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	async enginesByDimension(req, res, self) {
		if (await Permissions.check(req.token, 'engines', 'select')) {
			const dimension = Dimensions.creatDimension(
				req.body.length,
				req.body.width,
				req.body.initial_depth,
				req.body.final_depth,
				req.body.sidewalk_width
			)
			const max_capacity = Dimensions.getM3Real(dimension)
			const logist_id = Server.decodedIdByToken(req.token)
			const engines = await Engine.findAll({
				where: { max_capacity: { [Op.gte]: !isNaN(max_capacity) ? max_capacity : 0 } },
				include: [
					{
						model: Equipment,
						as: 'equipments',
						where: { logist_id },
					},
				],
			})
			if (engines && engines[0]) {
				await Equipments.updateAllRelations(engines)
				res.send({ status: 'ENGINES_GET_SUCCESS', data: engines })
			} else {
				res.send({ status: 'ENGINES_NOT_FOUND', error: 'engines not found' })
			}
		} else {
			res.send({ status: 'ENGINES_PERMISSION_ERROR', error: 'Action not allowed' })
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
		await EquipmentBasicsController.get(req, res, Engine)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await EquipmentBasicsController.list(req, res, Engine)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await EquipmentBasicsController.create(req, res, Engine)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await EquipmentBasicsController.change(req, res, Engine)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await EquipmentBasicsController.delete(req, res, Engine)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await EquipmentBasicsController.restore(req, res, Engine)
	},
}
