const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const BudgetMaterial = sequelize.define('budgets_materials', {
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
	material_id: {
		type: DataTypes.UUID,
		references: {
			model: 'budgets_materials',
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

module.exports = BudgetMaterial