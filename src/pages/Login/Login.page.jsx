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
import useStyles from './Login.style';

const Login = props => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [open, setOpen] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		const userData = {
			email,
			password
		};

		setLoading(true);

		axios
			.post('/login', userData)
			.then(res => {
				console.log(res.data);
				localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
				setLoading(false);
				props.history.push('/');
			})
			.catch(err => {
				const resError = err.response.data;
				console.log(resError);
				setErrors(err.response.data);
				setLoading(false);
				if (
					!resError.hasOwnProperty('email') &&
					!resError.hasOwnProperty('password') &&
					!resError.hasOwnProperty('general')
				) {
					setOpen(true);
				}
			});
	};

	const handleChange = event => {
		event.target.name === 'email' && setEmail(event.target.value);
		event.target.name === 'password' && setPassword(event.target.value);
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
					loading={loading}
					isLogin
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

Login.propTypes = {
	history: PropTypes.object
};

export default Login;
