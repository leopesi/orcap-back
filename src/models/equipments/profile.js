const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Equipment = require('./equipment')

const Profile = sequelize.define('profiles', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	equipment_id: {
		type: DataTypes.UUID,
		references: {
			model: 'equipments',
			key: 'id',
		},
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	}
})

Profile.belongsTo(Equipment, { foreignKey: 'equipment_id', as: 'equipments' })

module.exports = Profile