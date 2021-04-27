const { Sequelize, DataTypes } = require('sequelize')
const { model } = require('../../helpers/postgres')
const sequelize = require('../../helpers/postgres')
const Brand = require('./brand')

const Model = sequelize.define('models', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	brand_id: {
		type: DataTypes.UUID,
		references: {
			model: 'brands',
			key: 'id',
		},
	},
	name: DataTypes.STRING(50),
	description: DataTypes.STRING(50),
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})

Model.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brands' })

module.exports = Model