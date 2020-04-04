import React from 'react';
import { Link } from 'react-router-dom';

// MUI components
import Button from '@material-ui/core/Button';

const LoginLogoutButtons = props => {
	const { authenticated, logoutUser, handleClick } = props;
	if (authenticated) {
		return (
			<Button
				color='inherit'
				component={Link}
				to='/'
				onClick={logoutUser}
			>
				Logout
			</Button>
		);
	}

	if (!authenticated) {
		return (
			<React.Fragment>
				<Button
					color='inherit'
					component={Link}
					to='/login'
					onClick={handleClick}
				>
					Login
				</Button>
				<Button
					color='inherit'
					component={Link}
					to='/signup'
					onClick={handleClick}
				>
					Sign up
				</Button>
			</React.Fragment>
		);
	}
};

export default LoginLogoutButtons;
