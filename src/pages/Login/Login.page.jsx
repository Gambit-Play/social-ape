import React from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../../images/icon.png';

// Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Style
import useStyles from './Login.style';

const Login = props => {
	const classes = useStyles();

	return (
		<Grid container className={classes.form}>
			<Grid item sm></Grid>
			<Grid item sm>
				<img src={AppIcon} alt='App Icon' />
				<Typography variant='h3' className={classes.pageTitle}>
					Login
				</Typography>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
};

Login.propTypes = {};

export default Login;
