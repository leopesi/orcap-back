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
	text: {
		type: DataTypes.STRING
	},
	cost: DataTypes.DECIMAL(10, 2),
	profit_margin: DataTypes.DECIMAL(10, 2),
	price: DataTypes.DECIMAL(10, 2),
	final_price: DataTypes.DECIMAL(10, 2),
	man_power: DataTypes.DECIMAL(10, 2),
	discount: DataTypes.DECIMAL(10, 2),
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