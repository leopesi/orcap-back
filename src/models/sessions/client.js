const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

module.exports = sequelize.define('clients', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: DataTypes.STRING(50),
	phone: DataTypes.STRING,
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
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
			return this.name
		}
	}
})
