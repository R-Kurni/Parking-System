import FETCH_PARKINGS_SUCCESS from "../actions/actionType";

const initialState = {
	parkings: [],
};

function parkingReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_PARKINGS_SUCCESS:
			return {
				...state,
				parkings: action.payload,
			};
		default:
			return state;
	}
}

export default parkingReducer;
