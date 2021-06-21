/**
 * @module ProfilesController
 */
const sequelize = require('sequelize')
const Op = sequelize.Op
const Server = require('../../helpers/server')
const Permissions = require('../sessions/permissions')
const EquipmentBasicsController = require('../defaults/equipment-basics')
const Equipments = require('./equipments')

const Profile = require('../../models/equipments/profile')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/profiles-by-dimension', this.profilesByDimension, this).post(true)
		Server.addRoute('/profiles/:id', this.get, this).get(true)
		Server.addRoute('/profiles/', this.list, this).get(true)
		Server.addRoute('/profiles', this.create, this).post(true)
		Server.addRoute('/profiles/:id/restore', this.restore, this).put(true)
		Server.addRoute('/profiles/:id', this.change, this).put(true)
		Server.addRoute('/profiles/:id', this.delete, this).delete(true)
		this.setForeignKey()
	},

	/**
	 * @function
	 * Seta as as chaves dos models
	 */
	async setForeignKey() {
		Profile.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })
	},

	async profilesByDimension(req, res, self) {
		if (await Permissions.check(req.token, 'profiles', 'select')) {
			const logist_id = Server.decodedIdByToken(req.token)
			const profiles = await Profile.findAll({
				where: { },
				include: [
					{
						model: Equipment,
						as: 'equipments',
						where: { logist_id },
					},
				],
			})
			if (profiles && profiles[0]) {
				await Equipments.updateAllRelations(profiles)
				res.send({ status: 'PROFILES_GET_SUCCESS', data: profiles })
			} else {
				res.send({ status: 'PROFILES_NOT_FOUND', error: 'profiles not found' })
			}
		} else {
			res.send({ status: 'PROFILES_PERMISSION_ERROR', error: 'Action not allowed' })
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
		await EquipmentBasicsController.get(req, res, Profile)
	},

	/**
	 * @function
	 * Lista dos registros
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async list(req, res, self) {
		await EquipmentBasicsController.list(req, res, Profile)
	},

	/**
	 * @function
	 * Cria um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async create(req, res, self) {
		await EquipmentBasicsController.create(req, res, Profile)
	},

	/**
	 * @function
	 * Altera um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async change(req, res, self) {
		await EquipmentBasicsController.change(req, res, Profile)
	},

	/**
	 * @function
	 * Deleta um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async delete(req, res, self) {
		await EquipmentBasicsController.delete(req, res, Profile)
	},

	/**
	 * @function
	 * Restaura um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async restore(req, res, self) {
		await EquipmentBasicsController.restore(req, res, Profile)
	},
}
