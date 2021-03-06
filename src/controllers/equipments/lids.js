/**
 * @module LidsController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Sessions = require('../sessions/sessions')
const Permissions = require('../sessions/permissions')
const EquipmentBasicsController = require('../defaults/equipment-basics')
const Equipments = require('./equipments')

const Lid = require('../../models/equipments/lid')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/lids-by-filters', this.lidsByFilters, this).post(true)
		Server.addRoute('/lids/:id', this.get, this).get(true)
		Server.addRoute('/lids/', this.list, this).get(true)
		Server.addRoute('/lids', this.create, this).post(true)
		Server.addRoute('/lids/:id/restore', this.restore, this).put(true)
		Server.addRoute('/lids/:id', this.change, this).put(true)
		Server.addRoute('/lids/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Lid.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	async lidsByFilters(req, res, self) {
		if (await Permissions.check(req.token, 'lids', 'select')) {
			const logist_id = await Sessions.getSessionId(req)
			const lids = await Lid.findAll({
				where: { },
				include: [
					{
						model: Equipment,
						as: 'equipments',
						where: { logist_id },
					},
				],
			})
			if (lids && lids[0]) {
				await Equipments.updateAllRelations(lids)
				res.send({ status: 'LIDS_GET_SUCCESS', data: lids })
			} else {
				res.send({ status: 'LIDS_NOT_FOUND', error: 'lids not found' })
			}
		} else {
			res.send({ status: 'LIDS_PERMISSION_ERROR', error: 'Action not allowed' })
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
		await EquipmentBasicsController.get(req, res, Lid)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await EquipmentBasicsController.list(req, res, Lid)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await EquipmentBasicsController.create(req, res, Lid)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await EquipmentBasicsController.change(req, res, Lid)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await EquipmentBasicsController.delete(req, res, Lid)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await EquipmentBasicsController.restore(req, res, Lid)
	},
}
