import FETCH_PARKINGS_SUCCESS from "./actionType";

export const fetchParkingsSuccess = (data) => {
	return {
		type: FETCH_PARKINGS_SUCCESS,
		payload: data,
	};
};

export const fetchParkings = () => {
	return async (dispatch) => {
		try {
			const res = await fetch("http://localhost:3000/parkings");
			const data = await res.json();
			console.log(data);
			dispatch(fetchParkingsSuccess(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const createParking = (parkingInput) => {
	return async (dispatch) => {
		try {
			await fetch("http://localhost:3000/parkings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(parkingInput),
			});
			await dispatch(fetchParkings());
		} catch (error) {
			console.log(error);
		}
	};
};
