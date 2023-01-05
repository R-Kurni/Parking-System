import FETCH_PARKINGS_SUCCESS from "./actionType";
import axios from "axios";

export const fetchParkingsSuccess = (data) => {
	return {
		type: FETCH_PARKINGS_SUCCESS,
		payload: data,
	};
};

export const fetchParkings = (userInput) => {
	return async (dispatch) => {
		try {
			const options = {
				method: "GET",
				url: "http://localhost:3000/parkings",
			};
			console.log(userInput);
			if (typeof userInput !== "undefined") {
				options.params = {
					type: userInput.type,
					timeInS: userInput.timeInS,
					timeInE: userInput.timeInE,
					priceS: userInput.priceS,
					priceE: userInput.priceE,
				};
			}
			const { data } = await axios(options);
			console.log(data);
			dispatch(fetchParkingsSuccess(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const createParking = (userInput) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "POST",
				url: "http://localhost:3000/parkings",
				data: {
					type: userInput.type,
					timeIn: userInput.timeIn,
					timeOut: userInput.timeOut,
				},
			});
			await dispatch(fetchParkings());
		} catch (error) {
			console.log(error);
		}
	};
};
