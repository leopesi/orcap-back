const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const Budget = sequelize.define('budgets', {
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
	seller_id: {
		type: DataTypes.UUID,
		references: {
			model: 'sellers',
			key: 'id',
		},
	},
	client_id: {
		type: DataTypes.UUID,
		references: {
			model: 'clients',
			key: 'id',
		},
	},
	format_id: {
		type: DataTypes.UUID,
		references: {
			model: 'formats',
			key: 'id',
		},
	},
	status: DataTypes.STRING,
	layout: DataTypes.STRING,
	payment: DataTypes.STRING,
	expiration_date: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
	discount: DataTypes.DECIMAL(10, 2),

	length: DataTypes.DECIMAL(10, 2),
	width: DataTypes.DECIMAL(10, 2),
	initial_depth: DataTypes.DECIMAL(10, 2),
	final_depth: DataTypes.DECIMAL(10, 2),
	sidewalk_width: DataTypes.DECIMAL(10, 2),
	medium_depth: DataTypes.DECIMAL(10, 2),
	perimeter: DataTypes.DECIMAL(10, 2),
	m2_wall: DataTypes.DECIMAL(10, 2),
	m2_facial: DataTypes.DECIMAL(10, 2),
	m2_total: DataTypes.DECIMAL(10, 2),
	m3_total: DataTypes.DECIMAL(10, 2),

	beach: DataTypes.BOOLEAN,
	beach_width: DataTypes.DECIMAL(10, 2),
	beach_initial_depth: DataTypes.DECIMAL(10, 2),
	beach_final_depth: DataTypes.DECIMAL(10, 2),
	beach_medium_depth: DataTypes.DECIMAL(10, 2),
	beach_perimeter: DataTypes.DECIMAL(10, 2),
	beach_m2_wall: DataTypes.DECIMAL(10, 2),
	beach_m2_facial: DataTypes.DECIMAL(10, 2),
	beach_m2_total: DataTypes.DECIMAL(10, 2),
	beach_m3_total: DataTypes.DECIMAL(10, 2),

	side_wall: DataTypes.DECIMAL(10, 2),
	subfloor: DataTypes.DECIMAL(10, 2),
	baldrame: DataTypes.DECIMAL(10, 2),
	mold: DataTypes.DECIMAL(10, 2),
	heating: DataTypes.DECIMAL(10, 2),
	cm_installation: DataTypes.DECIMAL(10, 2),
	vinyl_installation: DataTypes.DECIMAL(10, 2),
	excavation: DataTypes.DECIMAL(10, 2),
	mortar: DataTypes.DECIMAL(10, 2),
	reserve: DataTypes.DECIMAL(10, 2),
	conduction: DataTypes.DECIMAL(10, 2),
	material_placement: DataTypes.DECIMAL(10, 2),
	earth_removal: DataTypes.DECIMAL(10, 2),
	art: DataTypes.DECIMAL(10, 2),

	steps: DataTypes.BOOLEAN,
	number_steps: DataTypes.INTEGER,

	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
	},
})

module.exports = Budget
