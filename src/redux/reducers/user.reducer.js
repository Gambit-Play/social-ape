// Redux Types
import { UserTypes } from '../types';

const {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER
} = UserTypes;

const initialState = {
	authenticated: false,
	credentials: {},
	likes: [],
	notifications: [],
	loading: false
};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload
			};
		case LOADING_USER:
			return {
				...state,
				loading: true
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		default:
			return state;
	}
};

export default UserReducer;
