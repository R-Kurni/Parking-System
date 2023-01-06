"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		let dataParkings = require("../data/parking.json");
		dataParkings.forEach((el) => {
			el.createdAt = el.updatedAt = new Date();
		});
		await queryInterface.bulkInsert("Parkings", dataParkings);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Parkings", null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
