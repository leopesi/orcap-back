const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Equipment = require('./equipment')

const Filter = sequelize.define('filters', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	equipment_id: {
		type: DataTypes.UUID,
		references: {
			model: 'equipments',
			key: 'id',
		},
	},
	engine_id: {
		type: DataTypes.UUID,
		references: {
			model: 'engines',
			key: 'id',
		},
	},
	lid_id: {
		type: DataTypes.UUID,
		references: {
			model: 'lids',
			key: 'id',
		},
	},
	sand_id: {
		type: DataTypes.UUID,
		references: {
			model: 'sands',
			key: 'id',
		},
	},
	
	max_capacity: {
		type: DataTypes.DECIMAL,
	},
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
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

module.exports = Filter