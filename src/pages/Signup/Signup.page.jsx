import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
	signupUser,
	closeModule,
	logoutUser
} from '../../redux/actions/user.actions';

// Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LoginSingup from '../../components/LoginSingup/LoginSingup.component';

// Assets
import AppIcon from '../../images/icon.png';

// Style
import useStyles from './Signup.style';

const Signup = props => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [handle, setHandle] = useState('');

	const handleSubmit = event => {
		event.preventDefault();
		const newUser = {
			email,
			password,
			confirmPassword,
			handle
		};

		props.signupUser(newUser, props.history);
	};

	const handleChange = event => {
		event.target.name === 'email' && setEmail(event.target.value);
		event.target.name === 'password' && setPassword(event.target.value);
		event.target.name === 'confirmPassword' &&
			setConfirmPassword(event.target.value);
		event.target.name === 'handle' && setHandle(event.target.value);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		props.closeModule();
	};

	return (
		<Grid container className={classes.form}>
			<Grid item sm></Grid>
			<Grid item sm>
				<img src={AppIcon} alt='App Icon' className={classes.image} />
				<Typography variant='h3' className={classes.pageTitle}>
					Login
				</Typography>
				<LoginSingup
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					email={email}
					password={password}
					confirmPassword={confirmPassword}
					handle={handle}
					isSignup
				/>
			</Grid>
			<Grid item sm></Grid>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={props.UI.open}
				autoHideDuration={6000}
				onClose={handleClose}
				className={classes.snackbar}
			>
				<Alert
					elevation={6}
					variant='filled'
					onClose={handleClose}
					severity='error'
				>
					Wrong credential. This user does not exist
				</Alert>
			</Snackbar>
		</Grid>
	);
};

Signup.propTypes = {
	history: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	closeModule: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	signupUser,
	logoutUser,
	closeModule
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
