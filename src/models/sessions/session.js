const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

module.exports = sequelize.define('sessions', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	person: {
		type: DataTypes.UUID
	},
	table: {
		type: DataTypes.STRING(50)
	},
	type: {
		type: DataTypes.STRING(50)
	},
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
