"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Parking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Parking.init(
		{
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Type is required",
					},
					notEmpty: {
						msg: "Type is required",
					},
				},
			},
			timeIn: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Time In is required",
					},
					notEmpty: {
						msg: "Time In is required",
					},
				},
			},
			timeOut: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Time Out is required",
					},
					notEmpty: {
						msg: "Time Out is required",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Price is required",
					},
					notEmpty: {
						msg: "Price is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Parking",
		}
	);
	return Parking;
};
