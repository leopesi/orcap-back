const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const PermissionGroup = sequelize.define(
	'permissions_groups',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING(50),
			unique: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW,
		},
	},
	{
		getterMethods: {},
	}
)

module.exports = PermissionGroup