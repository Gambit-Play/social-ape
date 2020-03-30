// Redux Types
import { UserTypes } from '../types';

const { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } = UserTypes;

const initialState = {
	authenticated: false,
	credentials: {},
	likes: [],
	notifications: []
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
				...action.payload
			};
		case SET_UNAUTHENTICATED:
			return state;
		default:
			return state;
	}
};

export default UserReducer;
