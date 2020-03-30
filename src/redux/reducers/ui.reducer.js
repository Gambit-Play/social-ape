import { UITypes } from '../types';

const { LOADING_START, LOADING_FINISH, SET_OPEN, SET_ERRORS, CLEAR_ERRORS, SET_CLOSE } = UITypes;
const initialState = {
	loading: false,
	errors: '',
	open: false
};

const UIReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: ''
			};
		case SET_OPEN:
			return {
				...state,
				open: true
			};
		case SET_CLOSE:
			return {
				...state,
				open: false
			};
		case LOADING_START:
			return {
				...state,
				loading: true
			};
		case LOADING_FINISH:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
};

export default UIReducer;
