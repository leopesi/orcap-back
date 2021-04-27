const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Provider = require('./provider')

const Brand = sequelize.define('brands', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
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
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
})

Brand.belongsTo(Provider, { foreignKey: 'provider_id', as: 'providers' })

module.exports = Brand