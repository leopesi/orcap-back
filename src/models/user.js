const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../helpers/postgres')

module.exports = sequelize.define('users', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	type: {
		type: DataTypes.STRING(50),
		defaultValue: 'client'
	},
	name: DataTypes.STRING(50),
	mail: {
		type: DataTypes.STRING(255),
		unique: true
	},
	password: DataTypes.STRING,
	phone: DataTypes.STRING,
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	last_login: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
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
	getterMethods: {
		getFullName() {
			return this.name + ' ' + this.mail;
		}
	}
})
