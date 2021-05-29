/**
 * @module EquipmentsController
 */
const Server = require('../../helpers/server')
const Logist = require('../../models/sessions/logist')
const Provider = require('../../models/basics/provider')
const Brand = require('../../models/basics/brand')
const Equipment = require('../../models/equipments/equipment')

module.exports = {
	/**
	 * @function
	 * Seta as rotas do Controller
	 */
	setRoutes() {
		Server.addRoute('/equipments/:id', this.get, this).get(true)
		this.setForeignKey()
	},

	async setForeignKey() {
		Equipment.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })
		Equipment.belongsTo(Provider, { foreignKey: 'provider_id', as: 'providers' })
		Equipment.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brands' })
	},

	async updateAllRelations(list) {
		const rel_logist = await this.getListRelations(Logist)
		const rel_brands = await this.getListRelations(Brand)
		const rel_providers = await this.getListRelations(Provider)
		for (const i in list) {
			if (list[i].equipments) {
				list[i].dataValues.logists = rel_logist[list[i].equipments.logist_id]
				list[i].dataValues.brands = rel_brands[list[i].equipments.brand_id]
				list[i].dataValues.providers = rel_providers[list[i].equipments.provider_id]
			}
		}
		return list
	},

	async updateSingleRelations(data) {
		if (data.equipments) {
			const rel_logist = await this.getSingleRelations(Logist, data.equipments.logist_id)
			const rel_brands = await this.getSingleRelations(Brand, data.equipments.brand_id)
			const rel_providers = await this.getSingleRelations(Provider, data.equipments.provider_id)
			data.logists = rel_logist
			data.brands = rel_brands
			data.providers = rel_providers
		}
		return data
	},

	async getListRelations(model) {
		const md = await model.findAll({
			where: {},
		})
		const relarions = {}
		for (const i in md) {
			relarions[md[i].id] = md[i]
		}
		return relarions
	},

	async getSingleRelations(model, id) {
		const md = await model.findOne({
			where: { id },
		})
		return md.dataValues
	},

	/**
	 * @function
	 * Retorna um Registro
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Object} self
	 */
	async get(req, res, self) {
		await CrudBasicsController.get(req, res, Equipment)
	},
}
