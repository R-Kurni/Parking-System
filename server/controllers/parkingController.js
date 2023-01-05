const { Parking, Sequelize } = require("../models");
const { Op } = Sequelize;

class ParkingController {
	static async getParkings(req, res, next) {
		const options = { order: [["id", "DESC"]] };
		const { type, timeInS, timeInE, priceS, priceE } = req.query;
		if (type !== "" && typeof type !== "undefined") {
			if (type !== " ") {
				options.where = {
					...options.where,
					type: type,
				};
			}
		}
		if (
			timeInS !== "" &&
			typeof timeInS !== "undefined" &&
			timeInE !== "" &&
			typeof timeInE !== "undefined"
		) {
			options.where = {
				...options.where,
				timeIn: { [Op.between]: [timeInS, timeInE] },
			};
		} else if (timeInS !== "" && typeof timeInS !== "undefined") {
			options.where = {
				...options.where,
				timeIn: { [Op.gte]: timeInS },
			};
		} else if (timeInE !== "" && typeof timeInE !== "undefined") {
			options.where = {
				...options.where,
				timeIn: { [Op.lte]: timeInE },
			};
		}
		if (
			+priceS !== 0 &&
			typeof priceS !== "undefined" &&
			+priceE !== 0 &&
			typeof priceE !== "undefined"
		) {
			options.where = {
				...options.where,
				price: { [Op.between]: [+priceS, +priceE] },
			};
		} else if (+priceS !== 0 && typeof priceS !== "undefined") {
			options.where = {
				...options.where,
				price: { [Op.gte]: +priceS },
			};
		} else if (+priceE !== 0 && typeof priceE !== "undefined") {
			options.where = {
				...options.where,
				price: { [Op.lte]: +priceE },
			};
		}
		console.log(+priceS);
		try {
			const parkings = await Parking.findAll(options);
			res.status(200).json(parkings);
		} catch (error) {
			next(error);
		}
	}

	static async createParking(req, res, next) {
		try {
			const { type, timeIn, timeOut } = req.body;
			// convert
			const convertToSeconds = (string) => {
				let date = new Date(string);
				let seconds = date.getTime() / 1000;
				return seconds;
			};
			const formatTimeIn = convertToSeconds(timeIn);
			const formatTimeOut = convertToSeconds(timeOut);
			const duration = formatTimeOut - formatTimeIn;
			if (duration == 0) {
				throw { name: "Invalid Input" };
			}
			const day = Math.floor(duration / 86400);
			const hour = Math.floor((duration % 86400) / 3600);
			const minute = Math.floor(((duration % 86400) % 3600) / 60);
			let price = 0;
			if (type == "Car") {
				if (day > 0) {
					price += day * 80000;
				}
				if (hour > 0) {
					if (hour > 15) {
						price += 80000;
					} else {
						price += hour * 5000;
					}
				}
				if (minute > 0 && hour < 16) {
					price += 5000;
				}
			} else if (type == "Motorcycle") {
				if (day > 0) {
					price += day * 40000;
				}
				if (hour > 0) {
					if (hour > 15) {
						price += 40000;
					} else {
						price += hour * 2000;
					}
				}
				if (minute > 0 && hour < 16) {
					price += 2000;
				}
			}
			console.log(price);
			const parking = await Parking.create({
				type,
				timeIn,
				timeOut,
				price,
			});
			res.status(201).json({ parking });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ParkingController;
