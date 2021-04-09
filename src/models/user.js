const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../helpers/postgres')

module.exports = sequelize.define('users', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: DataTypes.STRING(50),
	mail: DataTypes.STRING(255),
	password: DataTypes.STRING,
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
	// async sync(attr) {
	// 	await sequelize.sync()
	// }
})
