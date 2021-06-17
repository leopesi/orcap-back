const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const BudgetEquipment = sequelize.define('budgets_equipments', {
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
	equipment_id: {
		type: DataTypes.UUID,
		references: {
			model: 'equipments',
			key: 'id',
		},
	},
	index: {
		type: DataTypes.INTEGER
	},
	type: {
		type: DataTypes.STRING
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

module.exports = BudgetEquipment