import React from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { UserTypes } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/user.actions';

// Pages
import Home from './pages/Home/Home.page';
import Login from './pages/Login/Login.page';
import Signup from './pages/Signup/Signup.page';

// Components
import Navbar from './components/Navbar/Navbar.component';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthRoute from './utils/AuthRoute';

// Styles
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import theme from './GlobalMui.theme';
import './App.styles.scss';
import axios from 'axios';

const { SET_AUTHENTICATED } = UserTypes;
const token = localStorage.FBIdToken;

if (token) {
	const decodedToken = jwtDecode(token);
	console.log(decodedToken);
	if (decodedToken.exp * 1001 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

const App = () => {
	return (
		<Provider store={store}>
			<StylesProvider injectFirst>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<Router>
						<Navbar />
						<div className='main-content'>
							<Switch>
								<Route exact path='/' component={Home} />
								<AuthRoute exact path='/login' component={Login} />
								<AuthRoute exact path='/signup' component={Signup} />
							</Switch>
						</div>
					</Router>
				</ThemeProvider>
			</StylesProvider>
		</Provider>
	);
};

export default App;
