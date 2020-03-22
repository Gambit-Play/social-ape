import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../components/Loader/Loader.component';

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
				<form
					noValidate
					onSubmit={handleSubmit}
					className={classes.formContainer}
				>
					<TextField
						id='email'
						name='email'
						type='email'
						label='Email'
						variant='outlined'
						color='secondary'
						helperText={errors.email}
						error={errors.email ? true : false}
						fullWidth
						className={classes.textField}
						value={email}
						onChange={handleChange}
					/>
					<TextField
						id='password'
						name='password'
						type='password'
						label='Password'
						variant='outlined'
						color='secondary'
						helperText={errors.password || errors.general}
						error={errors.password || errors.general ? true : false}
						fullWidth
						className={classes.textField}
						value={password}
						onChange={handleChange}
					/>
					{loading ? (
						<div className={classes.loader}>
							<Loader normal />
						</div>
					) : (
						<Button
							type='submit'
							variant='contained'
							color='secondary'
							className={classes.button}
						>
							Login
						</Button>
					)}
					<div className={classes.signupLink}>
						You don't have an account? Sign up{' '}
						<Link to='/signup'>here</Link>
					</div>
				</form>
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
