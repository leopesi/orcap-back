/**
 * @module SandsController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Sessions = require('../sessions/sessions')
const Permissions = require('../sessions/permissions')
const EquipmentBasicsController = require('../defaults/equipment-basics')
const Equipments = require('./equipments')

const Sand = require('../../models/equipments/sand')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/sands-by-filters', this.sandsByFilters, this).post(true)
		Server.addRoute('/sands/:id', this.get, this).get(true)
		Server.addRoute('/sands/', this.list, this).get(true)
		Server.addRoute('/sands', this.create, this).post(true)
		Server.addRoute('/sands/:id/restore', this.restore, this).put(true)
		Server.addRoute('/sands/:id', this.change, this).put(true)
		Server.addRoute('/sands/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Sand.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	async sandsByFilters(req, res, self) {
		if (await Permissions.check(req.token, 'sands', 'select')) {
			const logist_id = await Sessions.getSessionId(req)
			const sands = await Sand.findAll({
				where: { },
				include: [
					{
						model: Equipment,
						as: 'equipments',
						where: { logist_id },
					},
				],
			})
			if (sands && sands[0]) {
				await Equipments.updateAllRelations(sands)
				res.send({ status: 'SANDS_GET_SUCCESS', data: sands })
			} else {
				res.send({ status: 'SANDS_NOT_FOUND', error: 'lids not found' })
			}
		} else {
			res.send({ status: 'SANDS_PERMISSION_ERROR', error: 'Action not allowed' })
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
		await EquipmentBasicsController.get(req, res, Sand)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await EquipmentBasicsController.list(req, res, Sand)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await EquipmentBasicsController.create(req, res, Sand)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await EquipmentBasicsController.change(req, res, Sand)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await EquipmentBasicsController.delete(req, res, Sand)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await EquipmentBasicsController.restore(req, res, Sand)
	},
}
