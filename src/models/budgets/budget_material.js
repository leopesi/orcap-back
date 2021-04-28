const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const BudgetMaterial = sequelize.define('budgets_materials', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	budget: {
		type: DataTypes.UUID
	},
	material: {
		type: DataTypes.UUID
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})

module.exports = BudgetMaterial