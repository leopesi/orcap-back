const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const User = sequelize.define('users', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	session_id: {
		type: DataTypes.UUID,
		references: {
			model: 'sessions',
			key: 'id',
		},
	},
	user_type: {
		type: DataTypes.STRING(50)
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

module.exports = User