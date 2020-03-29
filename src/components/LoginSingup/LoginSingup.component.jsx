import React from 'react';
import { Link } from 'react-router-dom';

// Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loader from '../../components/Loader/Loader.component';

// Styles
import useStyles from './LoginSignup.styles';

const LoginSingup = props => {
	const classes = useStyles();
	const {
		handleSubmit,
		handleChange,
		email,
		password,
		confirmPassword,
		handle,
		loading,
		isLogin,
		isSignup,
		errors
	} = props;

	if (isLogin && isSignup) {
		return (
			<h3
				className={classes.warningText}
			>{`You can´t have both "isLogin" and "isSignup" enabled`}</h3>
		);
	}

	return (
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

			{isSignup && (
				<TextField
					id='confirmPassowrd'
					name='confirmPassword'
					type='password'
					label='Confirm Passowrd'
					variant='outlined'
					color='secondary'
					helperText={errors.confirmPassword || errors.general}
					error={
						errors.confirmPassword || errors.general ? true : false
					}
					fullWidth
					className={classes.textField}
					value={confirmPassword}
					onChange={handleChange}
				/>
			)}

			{isSignup && (
				<TextField
					id='handle'
					name='handle'
					type='text'
					label='Handle'
					variant='outlined'
					color='secondary'
					helperText={errors.handle || errors.general}
					error={errors.handle || errors.general ? true : false}
					fullWidth
					className={classes.textField}
					value={handle}
					onChange={handleChange}
				/>
			)}

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
					{isSignup && 'Sign up'}
					{isLogin && 'Login'}
				</Button>
			)}

			{isLogin && (
				<div className={classes.signupLink}>
					{`You don't have an account? Sign up `}
					<Link to='/signup'>here</Link>
				</div>
			)}

			{isSignup && (
				<div className={classes.signupLink}>
					{`Already have an account? Login `}
					<Link to='/login'>here</Link>
				</div>
			)}
		</form>
	);
};

export default LoginSingup;
