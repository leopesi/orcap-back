const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const TypeBudget  = sequelize.define('types_budgets', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: DataTypes.STRING(50),
	description: DataTypes.STRING(50),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})

module.exports = TypeBudget