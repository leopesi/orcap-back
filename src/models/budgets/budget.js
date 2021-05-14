const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Logist = require('../sessions/logist')
const Seller = require('../sessions/seller')
const Client = require('../sessions/client')
const Format = require('../basics/format')
const StatusBudget = require('../basics/status_budget')
const TypeBudget = require('../basics/type_budget')

const Budget = sequelize.define('budgets', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},	
	logist_id: {
		type: DataTypes.UUID,
		references: {
			model: 'logists',
			key: 'id',
		},
	},
	seller_id: {
		type: DataTypes.UUID,
		references: {
			model: 'sellers',
			key: 'id',
		},
	},
	client_id: {
		type: DataTypes.UUID,
		references: {
			model: 'clients',
			key: 'id',
		},
	},
	format_id: {
		type: DataTypes.UUID,
		references: {
			model: 'formats',
			key: 'id',
		},
	},
	status_budget_id: {
		type: DataTypes.UUID,
		references: {
			model: 'status_budgets',
			key: 'id',
		},
	},
	type_budget_id: {
		type: DataTypes.UUID,
		references: {
			model: 'types_budgets',
			key: 'id',
		},
	},
	length: DataTypes.DECIMAL(10, 2), 
	width: DataTypes.DECIMAL(10, 2), 
	initial_depth: DataTypes.DECIMAL(10, 2), 
	final_depth: DataTypes.DECIMAL(10, 2), 
	sidewalk_width: DataTypes.DECIMAL(10, 2), 
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})

module.exports = Budget