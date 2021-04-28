const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const Logist = require('../sessions/logist')

const Payment = sequelize.define('payments', {
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

Payment.belongsTo(Logist, { foreignKey: 'logist_id', as: 'logists' })

module.exports = Payment