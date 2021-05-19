/**
 * @module EquipmentsController
 */
const Server = require('../../helpers/server')
const Brand = require("../../models/basics/brand")
const Model = require("../../models/basics/model")
const Provider = require("../../models/basics/provider")
const Equipment = require("../../models/equipments/equipment")

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
		Equipment.belongsTo(Provider, { foreignKey: 'provider_id', as: 'providers' })
		Equipment.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brands' })
		Equipment.belongsTo(Model, { foreignKey: 'model_id', as: 'models' })
	},

	async updateRelations(list) {
		const rel_brands = await this.getListRelations(Brand)
		const rel_models = await this.getListRelations(Model)
		const rel_providers = await this.getListRelations(Provider)
		for (const i in list) {
			list[i].dataValues.brands = rel_brands[list[i].equipments.brand_id]
			list[i].dataValues.models = rel_models[list[i].equipments.model_id]
			list[i].dataValues.providers = rel_providers[list[i].equipments.provider_id]
		}
		return list
	},

	async getListRelations(model) {
		const md = await model.findAll({
			where: { },
		})
		const relarions = {}
		for (const i in md) {
			relarions[md[i].id] = md[i]
		}
		return relarions
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
