const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const Logist = sequelize.define(
	'logists',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		session_id: {
			type: DataTypes.UUID,
			references: {
				model: 'sessions',
				key: 'id',
			},
		},
		user_type: {
			type: DataTypes.STRING(50),
		},
		name: DataTypes.STRING(50),
		document: DataTypes.STRING,
		phone: DataTypes.STRING,
		brand_filter_id: {
			type: DataTypes.UUID,
			references: {
				model: 'brands',
				key: 'id',
			},
		},
		brand_profile_id: {
			type: DataTypes.UUID,
			references: {
				model: 'brands',
				key: 'id',
			},
		},
		brand_blanket_id: {
			type: DataTypes.UUID,
			references: {
				model: 'brands',
				key: 'id',
			},
		},
		brand_vinyl_id: {
			type: DataTypes.UUID,
			references: {
				model: 'brands',
				key: 'id',
			},
		},
		debit_card: DataTypes.DECIMAL,
		// cash_credit_card: 'Cartão de crédito à vista',
		installment_credit_card: DataTypes.TEXT,
		by_logist: DataTypes.TEXT,
		by_financial: DataTypes.TEXT,
		by_financial_down_payment: DataTypes.TEXT,
		max_discount: DataTypes.DECIMAL,
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
	},
	{
		getterMethods: {
			getFullName() {
				return this.name
			},
		},
	}
)

module.exports = Logist
