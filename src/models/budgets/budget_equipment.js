const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const BudgetEquipment = sequelize.define('budgets_equipments', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	budget: {
		type: DataTypes.UUID
	},
	equipment: {
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

module.exports = BudgetEquipment