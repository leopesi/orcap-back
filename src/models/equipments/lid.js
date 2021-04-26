const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

module.exports = sequelize.define('lids', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
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
