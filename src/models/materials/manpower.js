const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

module.exports = sequelize.define('manpowers', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: DataTypes.STRING(50),
	description: DataTypes.STRING(50),
	cost: DataTypes.DECIMAL(10, 2),
	profit_margin: DataTypes.DECIMAL(10, 2),
	price: DataTypes.DECIMAL(10, 2),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})
