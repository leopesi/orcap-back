const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Provider = require('../basics/provider')
const Brand = require('../basics/brand')
const Model = require('../basics/model')

const Equipment = sequelize.define('equipments', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	provider_id: {
		type: DataTypes.UUID,
		references: {
			model: 'providers',
			key: 'id',
		},
	},
	brand_id: {
		type: DataTypes.UUID,
		references: {
			model: 'brands',
			key: 'id',
		},
	},
	model_id: {
		type: DataTypes.UUID,
		references: {
			model: 'models',
			key: 'id',
		},
	},
	name: DataTypes.STRING(50),
	description: DataTypes.STRING(50),
	cost: DataTypes.DECIMAL(10, 2),
	profit_margin: DataTypes.DECIMAL(10, 2),
	cash_price: DataTypes.DECIMAL(10, 2),
	forward_price: DataTypes.DECIMAL(10, 2),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
})

Equipment.belongsTo(Provider, { foreignKey: 'provider_id', as: 'providers' })
Equipment.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brands' })
Equipment.belongsTo(Model, { foreignKey: 'model_id', as: 'models' })

module.exports = Equipment
