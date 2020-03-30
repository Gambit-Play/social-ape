// Redux Types
import { UITypes } from '../types';

const { CLEAR_ERRORS } = UITypes;

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};
