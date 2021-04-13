const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../helpers/postgres')

module.exports = sequelize.define('permissions', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: DataTypes.STRING(50),
	type: DataTypes.STRING(255),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	getterMethods: {
		getFullName() {
			return this.name + ' ' + this.mail;
		}
	}
})
