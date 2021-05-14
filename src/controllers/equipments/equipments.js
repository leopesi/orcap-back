/**
 * @module EquipmentsController
 */
// const Server = require('../../helpers/server')
// const Permissions = require('../sessions/permissions')
// const Equipment = require('../../models/equipments/equipment')

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
		this.setForeignKey()
	},

	async setForeignKey() {
		Equipment.belongsTo(Provider, { foreignKey: 'provider_id', as: 'providers' })
		Equipment.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brands' })
		Equipment.belongsTo(Model, { foreignKey: 'model_id', as: 'models' })
	}

}
