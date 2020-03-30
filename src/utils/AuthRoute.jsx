import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authenticated === true ? (
				<Redirect to='/' />
			) : (
				<Component {...props} />
			)
		}
	/>
);

AuthRoute.protoTypes = {
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);