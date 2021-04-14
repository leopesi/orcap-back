const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../helpers/postgres')

module.exports = sequelize.define('permissions', {
	name: {
		type: DataTypes.STRING(50),
		unique: 'compositeIndex',
		primaryKey: true
	},
	table: {
		type: DataTypes.STRING(50),
		unique: 'compositeIndex',
		primaryKey: true
	},
	type: {
		type: DataTypes.STRING(50),
		unique: 'compositeIndex',
		primaryKey: true
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	indexes: [{ unique: true, fields: ['name', 'table', 'type'] }],
	getterMethods: {
		
	}
})
