import React, { Component } from 'react';
import axios from 'axios';

// Components
import Scream from '../../components/Scream/Scream.component';
import Loader from '../../components/Loader/Loader.component';
import Grid from '@material-ui/core/Grid';

class Home extends Component {
	state = {
		screams: null
	};

	componentDidMount() {
		axios
			.get('/screams')
			.then(res => {
				this.setState({
					screams: res.data
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		let recentScreamsMarkup = this.state.screams ? (
			this.state.screams.map(scream => (
				<Scream key={scream.screamId} scream={scream} />
			))
		) : (
			<Loader />
		);

		return (
			<Grid container spacing={2}>
				<Grid
					container
					spacing={2}
					direction='row'
					alignItems='stretch'
					item
					sm={9}
					xs={12}
				>
					{recentScreamsMarkup}
				</Grid>
				<Grid item sm={3} xs={12}>
					<p>Profile Section</p>
				</Grid>
			</Grid>
		);
	}
}
export default Home;
