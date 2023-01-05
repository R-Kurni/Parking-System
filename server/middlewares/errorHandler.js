const errorHandler = (err, req, res, next) => {
	let code = 500;
	let message = "Internal Server Error";
	console.log(err);
	if (err.name === "SequelizeValidationError") {
		let errMsg = err.errors.map((el) => el.message);
		code = 400;
		message = errMsg[0];
	} else if (err.name === "Invalid Input") {
		code = 400;
		message = "Invalid Input";
	}
	res.status(code).json({ message });
};

module.exports = errorHandler;
