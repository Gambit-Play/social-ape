import axios from 'axios';

// Redux Types
import { UserTypes, UITypes } from '../types';

const { LOADING_START, LOADING_FINISH, SET_OPEN, SET_ERRORS, CLEAR_ERRORS, SET_CLOSE } = UITypes;
const { SET_USER } = UserTypes;

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
			const resError = err.response.data;
			console.log(resError);
			dispatch({
				type: SET_ERRORS,
				payload: resError
			});
			dispatch({ type: LOADING_FINISH });
			if (
				!resError.hasOwnProperty('email') &&
				!resError.hasOwnProperty('password') &&
				!resError.hasOwnProperty('general')
			) {
				dispatch({ type: SET_OPEN });
			}
		});
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
