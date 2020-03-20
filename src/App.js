import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home.page';
import Login from './pages/Login/Login.page';
import Signup from './pages/Signup/Signup.page';

// Components
import Navbar from './components/Navbar/Navbar.component';
import CssBaseline from '@material-ui/core/CssBaseline';

// Styles
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import theme from './GlobalMui.theme';
import './App.styles.scss';

const App = () => {
	return (
		<React.Fragment>
			<StylesProvider injectFirst>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<div className='App'>
						<Router>
							<Navbar />
							<div className='main-content'>
								<Switch>
									<Route exact path='/' component={Home} />
									<Route
										exact
										path='/login'
										component={Login}
									/>
									<Route
										exact
										path='/signup'
										component={Signup}
									/>
								</Switch>
							</div>
						</Router>
					</div>
				</ThemeProvider>
			</StylesProvider>
		</React.Fragment>
	);
};

export default App;
