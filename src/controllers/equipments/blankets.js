/**
 * @module BlanketsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const EquipmentBasicsController = require('../defaults/equipment-basics')
const Equipments = require('./equipments')

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

	/**
	 * @function
	 * Busca mantas com precos atualizados de acordo com a dimensao
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async blanketsByDimension(req, res, self) {
		if (await Permissions.check(req.token, 'blankets', 'select')) {
			const blankets = await Blanket.findAll({
				where: {},
				include: 'equipments',
			})
			if (blankets && blankets[0]) {
				await Equipments.updateAllRelations(blankets)
				res.send({ status: 'BLANKETS_GET_SUCCESS', data: blankets })
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
		await EquipmentBasicsController.get(req, res, Blanket, 'equipments')
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await EquipmentBasicsController.list(req, res, Blanket, 'equipments')
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await EquipmentBasicsController.create(req, res, Blanket, 'equipments')
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await EquipmentBasicsController.change(req, res, Blanket, 'equipments')
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await EquipmentBasicsController.delete(req, res, Blanket, 'equipments')
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await EquipmentBasicsController.restore(req, res, Blanket, 'equipments')
	},
}
