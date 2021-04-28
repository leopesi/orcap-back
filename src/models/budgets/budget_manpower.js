const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const BudgetManpower = sequelize.define('budgets_manpowers', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	budget: {
		type: DataTypes.UUID
	},
	manpower: {
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

module.exports = BudgetManpower