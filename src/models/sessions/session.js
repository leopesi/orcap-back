const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')
const User = require('./user')
const Logist = require('./logist')
const Seller = require('./seller')
const Client = require('./client')

const Session = sequelize.define(
	'sessions',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		table: {
			type: DataTypes.STRING(50),
		},
		mail: {
			type: DataTypes.STRING(255),
		},
		password: DataTypes.STRING,
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		active_hash: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		last_login: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.NOW,
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
		getterMethods: {
			getFullName() {
				return this.name + ' ' + this.mail
			},
		},
	}
)

Session.hasOne(User, { foreignKey: 'session_id', as: 'users' })
Session.hasOne(Logist, { foreignKey: 'session_id', as: 'logists' })
Session.hasOne(Seller, { foreignKey: 'session_id', as: 'sellers' })
Session.hasOne(Client, { foreignKey: 'session_id', as: 'clients' })

module.exports = Session
