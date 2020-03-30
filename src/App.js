import React from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

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

const token = localStorage.FBIdToken;
let authenticated;

if (token) {
	const decodedToken = jwtDecode(token);
	console.log(decodedToken);
	if (decodedToken.exp * 1001 < Date.now()) {
		window.location.href = '/login';
		authenticated = false;
	} else {
		authenticated = true;
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
								<AuthRoute
									exact
									path='/login'
									component={Login}
									authenticated={authenticated}
								/>
								<AuthRoute
									exact
									path='/signup'
									component={Signup}
									authenticated={authenticated}
								/>
							</Switch>
						</div>
					</Router>
				</ThemeProvider>
			</StylesProvider>
		</Provider>
	);
};

export default App;
