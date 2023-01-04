const { Parking } = require("../models");

class ParkingController {
	static async getParkings(req, res, next) {
		try {
			const parkings = await Parking.findAll({ order: [["id", "DESC"]] });
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
					price += hour * 5000;
				}
				if (minute > 0) {
					price += 5000;
				}
			} else if (type == "Motorcycle") {
				if (day > 0) {
					price += day * 40000;
				}
				if (hour > 0) {
					price += hour * 2000;
				}
				if (minute > 0) {
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
