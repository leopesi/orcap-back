const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const Equipment = sequelize.define('equipments', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	logist_id: {
		type: DataTypes.UUID,
		references: {
			model: 'logists',
			key: 'id',
		},
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

module.exports = Equipment
