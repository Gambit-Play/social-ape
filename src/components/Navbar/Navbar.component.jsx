import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { clearErrors } from '../../redux/actions/ui.actions';
import { logoutUser } from '../../redux/actions/user.actions';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = props => {
	const { clearErrors, UI, user, logoutUser } = props;

	const handleClick = () => {
		if (UI.errors) clearErrors();
	};

	const loginLogoutButtons = authenticated => {
		if (authenticated) {
			return (
				<Button color='inherit' component={Link} to='/' onClick={logoutUser}>
					Logout
				</Button>
			);
		}

		if (!authenticated) {
			return (
				<React.Fragment>
					<Button color='inherit' component={Link} to='/login' onClick={handleClick}>
						Login
					</Button>
					<Button color='inherit' component={Link} to='/signup' onClick={handleClick}>
						Sign up
					</Button>
				</React.Fragment>
			);
		}
	};
	return (
		<AppBar>
			<Toolbar variant='dense' className='nav-container'>
				<Button color='inherit' component={Link} to='/' onClick={handleClick}>
					Home
				</Button>
				{loginLogoutButtons(user.authenticated)}
			</Toolbar>
		</AppBar>
	);
};

const mapActionsToProps = {
	clearErrors,
	logoutUser
};

const mapStateToProps = state => ({
	UI: state.UI,
	user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
