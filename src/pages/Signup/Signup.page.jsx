import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [open, setOpen] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		const newUser = {
			email,
			password,
			confirmPassword,
			handle
		};

		setLoading(true);
		console.log(newUser);
		axios
			.post('/signup', newUser)
			.then(res => {
				console.log(res.data);
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
				setLoading(false);
				props.history.push('/');
			})
			.catch(err => {
				const errorMessage = err.response.data;
				console.log(errorMessage);
				setErrors(err.response.data);
				setLoading(false);
				if (
					!errorMessage.hasOwnProperty('email') &&
					!errorMessage.hasOwnProperty('password') &&
					!errorMessage.hasOwnProperty('general') &&
					!errorMessage.hasOwnProperty('handle') &&
					!errorMessage.hasOwnProperty('confirmPassword')
				) {
					setOpen(true);
				}
			});
	};

	const handleChange = event => {
		event.target.name === 'email' && setEmail(event.target.value);
		event.target.name === 'password' && setPassword(event.target.value);
		event.target.name === 'confirmPassword' && setConfirmPassword(event.target.value);
		event.target.name === 'handle' && setHandle(event.target.value);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
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
					loading={loading}
					isSignup
					errors={errors}
				/>
			</Grid>
			<Grid item sm></Grid>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				className={classes.snackbar}
			>
				<Alert elevation={6} variant='filled' onClose={handleClose} severity='error'>
					Wrong credential. This user does not exist
				</Alert>
			</Snackbar>
		</Grid>
	);
};

Signup.propTypes = {
	history: PropTypes.object
};

export default Signup;
