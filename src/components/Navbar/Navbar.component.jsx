import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { clearErrors } from '../../redux/actions/ui.actions';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = props => {
	const { clearErrors, UI } = props;

	const handleClick = () => {
		if (UI.errors) clearErrors();
	};
	return (
		<AppBar>
			<Toolbar variant='dense' className='nav-container'>
				<Button color='inherit' component={Link} to='/' onClick={handleClick}>
					Home
				</Button>
				<Button color='inherit' component={Link} to='/login' onClick={handleClick}>
					Login
				</Button>
				<Button color='inherit' component={Link} to='/signup' onClick={handleClick}>
					Sign up
				</Button>
			</Toolbar>
		</AppBar>
	);
};

const mapActionsToProps = {
	clearErrors
};

const mapStateToProps = state => ({
	UI: state.UI
});

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
