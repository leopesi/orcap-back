const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

module.exports = sequelize.define('equipments', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	provider: {
		type: DataTypes.UUID
	},
	brand: {
		type: DataTypes.UUID
	},
	model: {
		type: DataTypes.UUID
	},
	name: DataTypes.STRING(50),
	description: DataTypes.STRING(50),
	cost: DataTypes.DECIMAL(10, 2),
	profit_margin: DataTypes.DECIMAL(10, 2),
	cash_price: DataTypes.DECIMAL(10, 2),
	forward_price: DataTypes.DECIMAL(10, 2),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})
