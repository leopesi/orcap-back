const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const Provider = sequelize.define('providers', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	logist_id: {
		type: DataTypes.UUID,
		references: {
			model: 'providers',
			key: 'id',
		},
	},
	name: DataTypes.STRING(50),
	description: DataTypes.STRING(50),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})

module.exports = Provider