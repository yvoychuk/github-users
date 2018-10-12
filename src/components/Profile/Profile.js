import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import fetchProfile from '../../actions/profile';
import compose from '../HOC/compose';
import Container from './Container';
import Button from '@material-ui/core/Button';

const mapStateToProps = ({user}) => {return { user }}

const mapDispatchToProps = dispatch => {
	return {
		fetchProfile: (name) => dispatch(fetchProfile(name))
	}
}

const withBackLink = function(profileComponents) {
	return <div>
		<Link to="/">
			<Button color="primary" variant="outlined">back to list</Button>
		</Link>
		<Link to="/profile/yvoychuk">me</Link>
		{profileComponents}
	</div>
}

class Profile extends Component {
	componentDidMount() {
		let {match, fetchProfile} = this.props;
		let userName;
		if (typeof match != "undefined") {
			userName = match.params.userName;
		};
		if (typeof userName != "undefined") {
			fetchProfile(userName)
		};
	}

	render() {
		let { user, userName } = this.props;
		console.log('rerender', userName)
		return withBackLink(
			compose(
				user ? user.profile : {},
				<Container data={user} />
			)
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)