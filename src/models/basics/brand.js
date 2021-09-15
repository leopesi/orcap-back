const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Provider = require('./provider')

const Brand = sequelize.define('brands', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	logist_id: {
		type: DataTypes.UUID,
		references: {
			model: 'logists',
			key: 'id',
		},
	},
	provider_id: {
		type: DataTypes.UUID,
		references: {
			model: 'providers',
			key: 'id',
		},
	},
	name: DataTypes.STRING(50),
	description: DataTypes.STRING(50),
	city: DataTypes.STRING(50),
    neighborhood: DataTypes.STRING(50),
    street: DataTypes.STRING(50),
    number: DataTypes.STRING(50),
	mail: DataTypes.STRING(255),
    zipcode: DataTypes.STRING(50),
    document: DataTypes.STRING(50),
    phone: DataTypes.STRING,
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
})

module.exports = Brand