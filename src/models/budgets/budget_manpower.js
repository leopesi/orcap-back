const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const BudgetManpower = sequelize.define('budgets_manpowers', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	budget_id: {
		type: DataTypes.UUID,
		references: {
			model: 'budgets',
			key: 'id',
		},
	},
	manpower_id: {
		type: DataTypes.UUID,
		references: {
			model: 'budgets_manpowers',
			key: 'id',
		},
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