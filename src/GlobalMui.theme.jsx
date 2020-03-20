import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#66ffa6',
			main: '#00e676',
			dark: '#00b248',
			contrastText: '#000'
		},
		secondary: {
			light: '#428e92',
			main: '#006064',
			dark: '#00363a',
			contrastText: '#fff'
		}
	}
});

export default theme;
