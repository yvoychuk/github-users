import React, {Component} from 'react';
import compose from '../HOC/compose';
import Details from './Details';
import Followers from './Followers';
import Following from './Following';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = () => ({
	container: {
		display: 'flex',
		marginTop: '50px'
	}
})

class Container extends Component {
	render() {
		let { data, classes } = this.props;
		let { profile, following, followers } = data;
		return <div className={classes.container}>
            {
				compose(
					profile,
					<Details data={profile && profile.data} />
				)
			}
			{
				compose(
					following,
					<Following data={following && following.data} />
				)
			}
			{
				compose(
					followers,
					<Followers data={followers && followers.data} />
				)
			}
        </div>
	}
}

export default withStyles(styles)(Container)