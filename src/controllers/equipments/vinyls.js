/**
 * @module VinylsController
 */
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const EquipmentBasicsController = require('../defaults/equipment-basics')
const Equipments = require('./equipments')

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
			const vinyls = await Vinyl.findAll({
				where: {  },
				include: 'equipments',
			})
			if (vinyls && vinyls[0]) {
				await Equipments.updateAllRelations(vinyls)
				res.send({ status: 'VINYLS_GET_SUCCESS', data: vinyls })
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
		await EquipmentBasicsController.get(req, res, Vinyl, 'equipments')
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await EquipmentBasicsController.list(req, res, Vinyl, 'equipments')
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await EquipmentBasicsController.create(req, res, Vinyl, 'equipments')
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await EquipmentBasicsController.change(req, res, Vinyl, 'equipments')
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await EquipmentBasicsController.delete(req, res, Vinyl, 'equipments')
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await EquipmentBasicsController.restore(req, res, Vinyl, 'equipments')
	},
}
