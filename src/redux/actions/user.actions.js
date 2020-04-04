import axios from 'axios';

// Redux Types
import { UserTypes, UITypes } from '../types';

const {
	LOADING_START,
	LOADING_FINISH,
	SET_OPEN,
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_CLOSE
} = UITypes;
const { SET_USER, SET_UNAUTHENTICATED, LOADING_USER } = UserTypes;

const axiosHeader = token => {
	const FBIdToken = `Bearer ${token}`;

	localStorage.setItem('FBIdToken', FBIdToken);
	axios.defaults.headers.common['Authorization'] = FBIdToken;
};

const catchError = (errorMessage, dispatch) => {
	console.log(errorMessage);
	dispatch({
		type: SET_ERRORS,
		payload: errorMessage
	});
	dispatch({ type: LOADING_FINISH });
};

export const loginUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_START });

	axios
		.post('/login', userData)
		.then(res => {
			console.log(res.data);
			axiosHeader(res.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch(err => {
			const errorMessage = err.response.data;
			catchError(errorMessage, dispatch);
			if (
				!errorMessage.hasOwnProperty('email') &&
				!errorMessage.hasOwnProperty('password') &&
				!errorMessage.hasOwnProperty('general')
			) {
				dispatch({ type: SET_OPEN });
			}
		});
};

export const signupUser = (newUser, history) => dispatch => {
	dispatch({ type: LOADING_START });

	axios
		.post('/signup', newUser)
		.then(res => {
			console.log(res.data);
			axiosHeader(res.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch(err => {
			const errorMessage = err.response.data;
			catchError(errorMessage, dispatch);
			if (
				!errorMessage.hasOwnProperty('email') &&
				!errorMessage.hasOwnProperty('password') &&
				!errorMessage.hasOwnProperty('general') &&
				!errorMessage.hasOwnProperty('handle') &&
				!errorMessage.hasOwnProperty('confirmPassword')
			) {
				dispatch({ type: SET_OPEN });
			}
		});
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.get('/user')
		.then(res => {
			dispatch({
				type: SET_USER,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

export const uploadImage = formData => dispatch => {
	dispatch({ type: LOADING_USER });

	axios
		.post('/user/image', formData)
		.then(() => dispatch(getUserData()))
		.catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
	dispatch({ type: LOADING_USER });

	axios
		.post('/user', userDetails)
		.then(() => {
			dispatch(getUserData());
		})
		.catch(err => console.log(err));
};

export const closeModule = () => dispatch => {
	dispatch({ type: SET_CLOSE });
};
