const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../helpers/postgres')

const Format = sequelize.define('formats', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4
	},
	name: DataTypes.STRING(50),
	image: DataTypes.STRING(50),

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

	// Dados da Prainha
	beach_length: DataTypes.DECIMAL(10, 2),
	beach_width: DataTypes.DECIMAL(10, 2),
	beach_medium_depth: DataTypes.DECIMAL(10, 2),
	beach_perimeter: DataTypes.DECIMAL(10, 2),
	beach_m2_wall: DataTypes.DECIMAL(10, 2),
	beach_m2_facial: DataTypes.DECIMAL(10, 2),
	beach_m2_total: DataTypes.DECIMAL(10, 2),
	beach_m3_total: DataTypes.DECIMAL(10, 2),

	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
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

module.exports = Format