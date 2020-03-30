import axios from 'axios';

// Redux Types
import { UserTypes, UITypes } from '../types';

const { LOADING_START, LOADING_FINISH, SET_OPEN, SET_ERRORS, CLEAR_ERRORS, SET_CLOSE } = UITypes;
const { SET_USER, SET_UNAUTHENTICATED } = UserTypes;

export const loginUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_START });

	axios
		.post('/login', userData)
		.then(res => {
			console.log(res.data);
			const FBIdToken = `Bearer ${res.data.token}`;

			localStorage.setItem('FBIdToken', FBIdToken);
			axios.defaults.headers.common['Authorization'] = FBIdToken;
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch(err => {
			const errorMessage = err.response.data;
			console.log(errorMessage);
			dispatch({
				type: SET_ERRORS,
				payload: errorMessage
			});
			dispatch({ type: LOADING_FINISH });
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
			const FBIdToken = `Bearer ${res.data.token}`;

			localStorage.setItem('FBIdToken', FBIdToken);
			axios.defaults.headers.common['Authorization'] = FBIdToken;
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch(err => {
			const errorMessage = err.response.data;
			console.log(errorMessage);
			dispatch({
				type: SET_ERRORS,
				payload: errorMessage
			});
			dispatch({ type: LOADING_FINISH });
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

export const closeModule = () => dispatch => {
	dispatch({ type: SET_CLOSE });
};
