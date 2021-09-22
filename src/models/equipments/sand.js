const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Equipment = require('./equipment')

const Sand = sequelize.define('sands', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	equipment_id: {
		type: DataTypes.UUID,
		references: {
			model: 'equipments',
			key: 'id',
		},
	},
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	sand_kg: DataTypes.DECIMAL,
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
})

module.exports = Sand
